# // Team 16 -  Atlanta

# // Student number: 548771 | Student name: Hao DUAN  | Surname: Duan
# // Student number: 616805 | Student name: Meng LI       | Surname: Li
# // Student number: 650382 | Student name: Ming YU   | Surname: Chang
# // Student number: 629341 | Student name: Yu SUN        | Surname: Sun
# // Student number: 705077 | Student name: Yuxiang ZHOU  | Surname: Zhou
# // Student number: 656982 | Student name: Zhenya LI | Surname: Li



from bottle import route, run, template, static_file

@route('/')
def index():
    return template('/home/ubuntu/webserver/web_newest/index.html')

@route('/<filename>')
def index(filename):
    return template('/home/ubuntu/webserver/web_newest/'+filename)


@route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='/home/ubuntu/webserver/web_newest/static')

run(host='0.0.0.0', port=8080, debug = True)
