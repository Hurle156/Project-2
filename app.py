import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

engine = create_engine("sqlite:///Dataset/drafts.sqlite")

Base = automap_base()

Base.prepare(engine, reflect = True)

draft_data = Base.classes.drafts

app = Flask(__name__)


@app.route("/")
def home():
    """Someone opened this site, wow."""

    session = Session(engine)

    results = session.query(draft_data)

    session.close()
    Test = []
    for r in results:
        pick = {}
        pick["id"] = r.Id
        pick["Pick"] = r.Pick
        pick["name"] = r.Player
        Test.append(pick)
    return jsonify(Test)


if __name__ == '__main__':
    app.run(debug = True)