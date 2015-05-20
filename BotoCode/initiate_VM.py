#!/usr/bin/python

#==== header here ===================================================
# Team 16 - city: Atlanta
# Student number: 656982 | Student name: Zhenya Li    | Surname: Li 
# Student number: 616805 | Student name: Meng Li      | Surname: Li
# Student number: 650382 | Student name: Ming Yu      | Surname: Chang
# Student number: 548771 | Student name: Hao Duan     | Surname: Duan
# Student number: 629341 | Student name: Yu Sun       | Surname: Sun
# Student number: 705077 | Student name: Yuxiang Zhou | Surname: Zhou
# ===================================================================

import sys
import time
import boto
from boto.ec2.connection import EC2Connection
from boto.ec2.regioninfo import *


def main(argv):

	# aws_access_key_id and aws_secret_access_key are parts of the EC2 credentials
	# 	the default values are my team account EC2 credentials
	# region_name is the region where the instance would be launched
	# 	the default value is the melbourne-np
	# key_name is the neme of the key that is used to launch images
	#	the default value is twitter_key which we have created
	# ami_id is the name of the name of image 
	# 	the default value is ami-000022b3 that is Ubuntu 14.04.2
	# instance_type is the type of the instance
	# 	the default value is m1.small
	# security_groups is list of the security groups used
	# 	the default value is ['couchdb', 'ssh', 'http']
	# volume_size is the size of the new volume
	# 	the default value is 60
	# num_instance is the number of the instance you want to launch
	# 	the default value is 1

	if len(sys.argv) == 1:
		aws_access_key_id = "65b0204902a04551824456f16c36a93c"
		aws_secret_access_key = "72a9e462bf8c46de9492c77c66d42b0c"

		# aws_access_key_id = "130a27d500a64d9b92c7510c0be9c4d5"
		# aws_secret_access_key = "a8875c7d29b44701984cdd53df951351"

		region_name = "melbourne-np"
		keyName = "twitter_key"
		ami_id = "ami-000022b3"
		instanceType = "m1.small"
		securityGroups = ['couchdb', 'ssh', 'http']
		volume_size = 60
		num_instance = 1
	elif len(sys.argv) == 4:
		aws_access_key_id = sys.argv[1]
		aws_secret_access_key = sys.argv[2]
		region_name = sys.argv[3]
	elif len(sys.argv) == 10:
		aws_access_key_id = sys.argv[1]
		aws_secret_access_key = sys.argv[2]
		region_name = sys.argv[3]
		keyName = sys.argv[4]
		ami_id = sys.argv[5]
		instanceType = sys.argv[6]
		securityGroups = sys.argv[7]
		volume_size = sys.argv[8]
		num_instance = sys.argv[9]
	else:
		print 'Input again! The number of arguments is wrong!'

	ec2_conn = connect_ec2(aws_access_key_id, aws_secret_access_key, region_name)
	define_security_groups()
	# check_key(key_name)

	# launch several instances
	instances = []
	i = 0
	while (i < num_instance):
		instance = launch_instance(ec2_conn, ami_id, keyName, instanceType, securityGroups)
		instances.append(instance)
		i+=1

	reservations = ec2_conn.get_all_reservations()
	export_ip_address(reservations)
	create_attach_volume(ec2_conn, instances, volume_size)



# create a connection to NecTAR server
def connect_ec2(aws_access_key_id, aws_secret_access_key, region_name):
	region=RegionInfo(region_name, endpoint='nova.rc.nectar.org.au')
	ec2_conn = boto.connect_ec2(aws_access_key_id, aws_secret_access_key, is_secure=True, region=region, port=8773, path='/services/Cloud', validate_certs=False)
	return ec2_conn


# define the security groups used in the project
def define_security_groups(ec2_conn):
	sshAccess = ec2_conn.create_security_group('ssh', 'allow SSH connection')
	sshAccess.authorize('tcp', 22, 22, '0.0.0.0/0')

	couchDBAccess = ec2_conn.create_security_group('couchdb', 'allow remote access couchDB')
	couchDBAccess.authorize('tcp', 5984, 5984, '0.0.0.0/0')

	httpAccess = ec2_conn.create_security_group('http', 'allow HTTP/S')
	httpAccess.authorize('tcp', 80, 80, '0.0.0.0/0')
	httpAccess.authorize('tcp', 443, 443, '0.0.0.0/0')

	icmpAccess = ec2_conn.create_security_group('icmp', 'allow ICMP..ping..')
	icmpAccess.authorize('ICMP', 0, 65535, '0.0.0.0/0')

	# print the security groups that have defined
	rs = ec2_conn.get_all_security_groups()
	print rs


# check the key we want to use when launch images
# if it does not exsit then create it
def check_key(keyName):
	try:
		key = ec2.get_all_key_pairs(keynames=[keyName])[0]
	except ec2.ResponseError, e:
		if e.code == 'InvalidKeyPair.NotFound':
			print 'Creating keypair: %s' % keyName

            # Create an SSH key to use when logging into instances.
			key = ec2.create_key_pair(keyName)
            
            # NecTAR could store the public key but the private key nedds to save locally
            # The save method would chmod the file to protect your private key.
			key.save(key_dir)
		else:
			raise

# launch instance
def launch_instance(ec2_conn, ami_id, keyName, instanceType, securityGroups):
	reservation = ec2_conn.run_instances(ami_id, key_name=keyName, instance_type=instanceType, security_groups=securityGroups)
	# get the instance object inside the reservation object
	instance = reservation.instances[0]

	# the instance has been launched but it's not yet up and running  
	print 'waiting for instance'
	while instance.state != 'running':
		print '=='
		time.sleep(5)
		instance.update()
	print 'done'

	return instance



# export all of the ip address to a file 
# this file could be used by other software
def export_ip_address(reservations):
	ip_list = []
	for res in reservations:
		ip_list.append(res.instances[0].ip_address)
	f = open('./ansible/hosts', 'a')
	f.write('[twitterservers]\n')
	for ip in ip_list:
		ip_str = str(ip)
		f.write(ip_str + '\n')

# create and attach volume
def create_attach_volume(ec2_conn, instances, volume_size):
	for instance in instances:

		# the volume zone should be same as the instance region
		vzone = instance.placement

		# create volume
		volume = ec2_conn.create_volume(volume_size, vzone)

	    # Wait for the volume to be created.
		while volume.status != 'available':
			print '=='
			time.sleep(5)
			volume.update()

        # attach the volume to the instance
		volume.attach(instance.id, '/dev/vdc')



if __name__ == '__main__':
	main(sys.argv)





















