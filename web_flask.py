from typing import Literal
from flask import Flask, redirect, url_for, render_template, request, session, jsonify, make_response
from flask_cors import CORS
import numpy as np
import matplotlib.pyplot as plt
import io
import random
from flask import Response
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
from shapely.geometry import Point
from shapely.geometry.polygon import Polygon

app = Flask(__name__)
app.secret_key = "PaRiS"
CORS(app)

mass_conditions = ["left-front-feat", "right-front-seat", "left-aft-seat", "right-aft-seat", \
    "cargo-zone-1", "cargo-zone-2", "block-fuel"]
tom_rm_mass = [["rm", "level-rm"], ["tom", "level-tom"]]

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('base.html', conditions=mass_conditions, size=len(mass_conditions), tom_rm=tom_rm_mass, \
        size_tom=len(tom_rm_mass))

@app.route('/graph', methods=['GET', 'POST'])
def graph():
    points = request.args.get('points')
    points_list_string = points.split(',')
    li_total = []
    for item in points_list_string:
        li_total.append(float(item))
    l = len(li_total)
    x_values = []
    y_values = []
    for i in range(0, l-1, 2):
        x_values.append(li_total[i])
        y_values.append(li_total[i+1])
    fig = create_figure(x_values, y_values)
    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)
    return Response(output.getvalue(), mimetype='image/png')

def create_figure(x_values, y_values):
    fig = Figure()
    axis = fig.add_subplot(1,1,1)
    axis2 = fig.add_subplot(1,1,1, frame_on=False)
    xs = [0.85, 0.85, 1, 1.2, 1.2]
    ys = [0, 880, 1157, 1157, 0]
    axis.set_xlim([0.8, 1.3])
    axis.set_ylim([784, 1250])
    axis2.set_xlim([0.8, 1.3])
    axis2.set_ylim([784, 1250])
    check = True
    p_one = Point(x_values[0], y_values[0])
    p_two = Point(x_values[1], y_values[1])
    p_three = Point(x_values[2], y_values[2])
    polygon = Polygon([(xs[0], ys[0]), (xs[1], ys[1]), (xs[2], ys[2]), (xs[3], ys[3]), (xs[4], ys[4])])
    li_points = [p_one, p_two, p_three]
    for item in li_points:
        if not polygon.contains(item):
            check = False
    if check:
        fig.suptitle("Go fly brooo!", fontsize=16)
    else:
        fig.suptitle("Don't fly broooo!", fontsize=16)
    axis.plot(xs, ys, color='blue')
    axis2.scatter(x_values, y_values,  color="red")
    return fig

if __name__ == '__main__':
    app.run(debug=True)

