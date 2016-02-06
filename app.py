import random
import cv2
import task
from base64 import b64encode
from flask import Flask, render_template, request
from flask.ext.socketio import SocketIO, emit

app = Flask(__name__)
app.debug = False
app.threaded = True
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('my event', namespace='/test')
def test_message(message):
    Frame = task.GetVideo()
    FrameProccessed,status,tempValue = task.GetProccesedVideo()
    value = "Temporary Value :"+str(tempValue)
    try:
        Success, Jpeg = cv2.imencode('.jpg', Frame)
        StrOrginal = b64encode(Jpeg)
    except:
        print "Frame not proper"
    try:
        SuccessProccessed, JpegProccessed = cv2.imencode('.jpg', FrameProccessed)
        StrProccessed = b64encode(JpegProccessed)
    except:
        print "Frame proceesed not proper"

    TableData = task.GetTableData()
    GraphData = task.GetGraphData()
    emit('my response1',
         {'imageOgrinal':StrOrginal,'imageProccessed':StrProccessed,'status':status,'value':value,'table':TableData,'graph':GraphData})

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected')


if __name__ == '__main__':
    socketio.run(app,host='0.0.0.0')
