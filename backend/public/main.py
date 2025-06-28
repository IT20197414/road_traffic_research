import json , time
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import requests
import shutil
import numpy as np
import cv2
import glob
import random
from ultralytics import YOLO
import cv2
from postprocessing import *
import collections,numpy
import tensorflow as tf

model = YOLO("models/best.pt")
class_list = model.model.names
scale_show = 100

accident = YOLO("models/accident.pt")
accident_class_list = accident.model.names


person = YOLO("models/human.pt")
person_class_list = person.model.names


phone = YOLO("models/phone.pt")
phone_class_list = phone.model.names


vehicle = YOLO("models/yolov8s.pt")
vehicle_class_list = ["bicycle","motorcycle","car","bus","truck"]

app = Flask(__name__)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/accident', methods=['POST'])
def accident_fun():

  request_data = request.get_json()

  image_url = str("upload/"+request_data['url'])

  print(request_data['url'])

  frame = cv2.imread(image_url)

  results = accident.predict(frame)
  tem_array=numpy.array(results[0].boxes.cls.numpy().astype(int))
  counter = collections.Counter(tem_array)

  print(counter)
  accident_data=counter[0]

  labeled_img = draw_box(frame, results[0], accident_class_list)
  display_img = resize_image(labeled_img, scale_show)

  cv2.imwrite('output/'+request_data['url'],display_img)

  percentage_value=0

  for x in results[0].boxes.xywh:
    percentage_value=percentage_value+(x[2]*x[3])/(results[0].orig_shape[0]*results[0].orig_shape[1])*100

  print(percentage_value)
  print(float(percentage_value))
  percentage_value=float(percentage_value)

  json_dump = json.dumps({"percentage_value":str(percentage_value),"accident":str(accident_data),"success":"true"})

  return json_dump


@app.route('/person', methods=['POST'])
def person_fun():

  request_data = request.get_json()

  image_url = str("upload/"+request_data['url'])

  print(request_data['url'])

  frame = cv2.imread(image_url)

  results = person.predict(frame)
  tem_array=numpy.array(results[0].boxes.cls.numpy().astype(int))
  counter = collections.Counter(tem_array)

  print(counter)
  person_data=counter[0]

  labeled_img = draw_box(frame, results[0], person_class_list)
  display_img = resize_image(labeled_img, scale_show)

  cv2.imwrite('output/'+request_data['url'],display_img)

  percentage_value=0

  for x in results[0].boxes.xywh:
    percentage_value=percentage_value+(x[2]*x[3])/(results[0].orig_shape[0]*results[0].orig_shape[1])*100

  print(percentage_value)
  print(float(percentage_value))
  percentage_value=float(percentage_value)

  json_dump = json.dumps({"percentage_value":str(percentage_value),"person":str(person_data),"success":"true"})

  return json_dump


@app.route('/phone', methods=['POST'])
def phone_fun():

  request_data = request.get_json()

  image_url = str("upload/"+request_data['url'])

  print(request_data['url'])

  frame = cv2.imread(image_url)

  results = phone.predict(frame)
  tem_array=numpy.array(results[0].boxes.cls.numpy().astype(int))
  counter = collections.Counter(tem_array)

  labeled_img = draw_box(frame, results[0], phone_class_list)
  display_img = resize_image(labeled_img, scale_show)

  cv2.imwrite('output/'+request_data['url'],display_img)

  percentage_value=0

  for x in results[0].boxes.xywh:
    percentage_value=percentage_value+(x[2]*x[3])/(results[0].orig_shape[0]*results[0].orig_shape[1])*100

  print(percentage_value)
  print(float(percentage_value))
  percentage_value=float(percentage_value)

  json_dump = json.dumps({"percentage_value":str(percentage_value),"success":"true"})

  return json_dump


@app.route('/vehicle', methods=['POST'])
def vehicle_fun():

  request_data = request.get_json()

  image_url = str("upload/"+request_data['url'])

  print(request_data['url'])

  frame = cv2.imread(image_url)

  results = vehicle.predict(frame)
  tem_array=numpy.array(results[0].boxes.cls.numpy().astype(int))
  counter = collections.Counter(tem_array)

  labeled_img = draw_box_cls(frame, results[0], vehicle.model.names,vehicle_class_list)
  display_img = resize_image(labeled_img, scale_show)

  cv2.imwrite('output/'+request_data['url'],display_img)

  percentage_value=0

  for x in results[0].boxes.xywh:
    percentage_value=percentage_value+(x[2]*x[3])/(results[0].orig_shape[0]*results[0].orig_shape[1])*100

  print(percentage_value)
  print(float(percentage_value))
  percentage_value=float(percentage_value)

  json_dump = json.dumps({"percentage_value":str(percentage_value),"success":"true"})

  return json_dump

if __name__ == '__main__':
	app.run(host="127.0.0.1", port=8888)