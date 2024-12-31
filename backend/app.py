from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
db = SQLAlchemy(app)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200), nullable=False)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

db.create_all()

# Update endpoints to interact with the database
@app.route('/expenses', methods=['GET'])
def get_expenses():
    expenses = Expense.query.all()
    return jsonify([{'id': e.id, 'amount': e.amount, 'category': e.category, 'description': e.description} for e in expenses])

@app.route('/expenses', methods=['POST'])
def add_expense():
    data = request.json
    new_expense = Expense(amount=data['amount'], category=data['category'], description=data['description'])
    db.session.add(new_expense)
    db.session.commit()
    return jsonify({'id': new_expense.id}), 201

@app.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([c.name for c in categories])

@app.route('/categories', methods=['POST'])
def add_category():
    data = request.json
    if not Category.query.filter_by(name=data['category']).first():
        new_category = Category(name=data['category'])
        db.session.add(new_category)
        db.session.commit()
        return jsonify({'message': 'Category added'}), 201
    return jsonify({'error': 'Category already exists'}), 400

if __name__ == '__main__':
    app.run(debug=True)
