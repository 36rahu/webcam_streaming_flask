import cv2
from random import sample,randint
video = cv2.VideoCapture(0)

def GetVideo():
    global video
    ret,Frame = video.read()
    return Frame

def GetProccesedVideo():
    Frame = GetVideo()
    FrameProccessed = Frame * 10
    status = "OK"
    tempValue = randint(0,20)
    return FrameProccessed,status,tempValue

def GetTableData():
    TableData = []
    for i in range(0,3):
        TableData.append(sample(range(30),5))
    return TableData

def GetGraphData():
    GraphData  = []
    for i in range(10):
        GraphData.append(sample(range(30),2))
    #GraphData = [[1,5],[2,10],[3,15],[4,20],[5,25],[6,30],[7,35],[8,40],[9,45],[10,50]]
    return GraphData
