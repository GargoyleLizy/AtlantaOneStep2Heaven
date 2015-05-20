#==== header here ===================================================
# Team 16 - city: Atlanta
# Student number: 656982 | Student name: Zhenya Li    | Surname: Li 
# Student number: 616805 | Student name: Meng Li      | Surname: Li
# Student number: 650382 | Student name: Ming Yu      | Surname: Chang
# Student number: 548771 | Student name: Hao Duan     | Surname: Duan
# Student number: 629341 | Student name: Yu Sun       | Surname: Sun
# Student number: 705077 | Student name: Yuxiang Zhou | Surname: Zhou
# ===================================================================
#store all vm ip here
first_ip="115.146.93.108"
second_ip="115.146.93.74"
third_ip="115.146.93.234"
forth_ip="115.146.93.227"
# need to get local ip
local_ip="$(dig +short myip.opendns.com @resolver1.opendns.com)"
# get the dbname from input
local_dbname=$1	
remote_dbname=$2

echo local_ip=$local_ip
echo 
echo local_dbname=$local_dbname
echo remote_dbname=$remote_dbname
 
for varip in $first_ip $second_ip $third_ip $forth_ip
	do
	#echo remote ip is $varip
	if [ "$varip" = "$local_ip" ]; then
		echo $varip equals $local_ip skip this ip
	else
		echo try remote_to_local.py with $varip
		python remote_to_local.py $local_dbname $varip $remote_dbname
	fi	
done
