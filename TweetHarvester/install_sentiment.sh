#!/bin/bash
#==== header here ===================================================
# Team 16 - city: Atlanta
# Student number: 656982 | Student name: Zhenya Li    | Surname: Li 
# Student number: 616805 | Student name: Meng Li      | Surname: Li
# Student number: 650382 | Student name: Ming Yu      | Surname: Chang
# Student number: 548771 | Student name: Hao Duan     | Surname: Duan
# Student number: 629341 | Student name: Yu Sun       | Surname: Sun
# Student number: 705077 | Student name: Yuxiang Zhou | Surname: Zhou
# ===================================================================
sudo apt-get install wget
wget http://www.clips.ua.ac.be/media/pattern-2.6.zip
unzip pattern-2.6.zip
cd pattern-2.6
sudo python setup.py install
