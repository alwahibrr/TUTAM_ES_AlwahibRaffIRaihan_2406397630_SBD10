const db = require('../config/database');

const getTodos = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user.userId;
    const result = await db.query('SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    res.json({ success: true, payload: result.rows });
  } catch (error) {
    next(error);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user.userId;
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const result = await db.query(
      'INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, description || '']
    );
    res.status(201).json({ success: true, message: 'Todo created', payload: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

const updateTodoStatus = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user.userId;
    const { id } = req.params;
    const { is_completed } = req.body;

    if (is_completed === undefined) {
      return res.status(400).json({ success: false, message: 'is_completed status is required' });
    }

    const result = await db.query(
      'UPDATE todos SET is_completed = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [is_completed, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Todo not found or unauthorized' });
    }

    res.json({ success: true, message: 'Todo updated', payload: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user.userId;
    const { id } = req.params;

    const result = await db.query(
      'DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Todo not found or unauthorized' });
    }

    res.json({ success: true, message: 'Todo deleted', payload: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTodos, createTodo, updateTodoStatus, deleteTodo };
