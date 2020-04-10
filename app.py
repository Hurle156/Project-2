import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

engine = create_engine("sqlite:///Dataset/drafts.sqlite")

Base = automap_base()

Base.prepare(engine, reflect = True)

draft_data = Base.classes.drafts

app = Flask(__name__)


@app.route("/")
def home():
    """Someone opened this site, wow."""
    webpage = render_template("index.html")

    return webpage

@app.route("/all-data")
def data():
    session = Session(engine)

    results = session.query(draft_data)
    session.close()
    Test = []
    for r in results:
        pick = {}
        pick["year"] = r.Year
        pick["id"] = r.Id
        pick["round"] = r.Rd
        pick["pick"] = r.Pick
        pick["team"] = r.Team
        pick["name"] = r.Player
        pick["pos"] = r.Pos
        pick["hs"] = r.HS
        pick["st"] = r.St
        pick["signed"] = r.Signed
        pick["bonus"] = r.Bonus
        Test.append(pick)
    return jsonify(Test)


if __name__ == '__main__':
    app.run(debug = True)