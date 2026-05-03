const express = require('express');
const { getTodos, createTodo, updateTodoStatus, deleteTodo } = require('../controllers/todo.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodoStatus);
router.delete('/:id', deleteTodo);

module.exports = router;
