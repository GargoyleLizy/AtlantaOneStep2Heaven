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
import boto
from boto.ec2.connection import EC2Connection
from boto.ec2.regioninfo import *


def main(argv):

	# take in command-line arguments [aws_access_key_id, aws_secret_access_key, region_name]
	# aws_access_key_id and aws_secret_access_key are parts of the EC2 credentials
	# 	the EC2 credentials file could be downloaded from 
	# 	NecTAR dashboard/Access & Security/API Access/EC2 credentials
	# 	the default values are my team account EC2 credentials
	# region_name is the region where the instance would be launched
	# 	the default value is the melbourne-np
	
	if len(sys.argv) == 1:
		aws_access_key_id = "65b0204902a04551824456f16c36a93c"
		aws_secret_access_key = "72a9e462bf8c46de9492c77c66d42b0c"
		region_name = "melbourne-np"

	elif len(sys.argv) == 3:
		aws_access_key_id = sys.argv[1]
		aws_secret_access_key = sys.argv[2]
		region_name = sys.argv[3]

	else:
		print 'Input again! The number of arguments is wrong!'

	ec2_conn = connect_ec2(aws_access_key_id, aws_secret_access_key, region_name)
	volumes = ec2_conn.get_all_volumes()
	# create snapshot for all volumes
	snaps = [v.create_snapshot() for v in volumes] 


# create a connection to NecTAR service
def connect_ec2(aws_access_key_id, aws_secret_access_key, region_name):
	region=RegionInfo(region_name, endpoint='nova.rc.nectar.org.au')
	ec2_conn = boto.connect_ec2(aws_access_key_id, aws_secret_access_key, is_secure=True, region=region, port=8773, path='/services/Cloud', validate_certs=False)
	return ec2_conn


if __name__ == '__main__':
	main(sys.argv)





















