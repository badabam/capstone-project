import styled from 'styled-components';

import ScreenReaderOnly from './ScreenReaderOnly.js';

export default function TodoForm({onCreateTodo}) {
  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="todo-input">Todo description</label>
      <input maxLength={100} id="todo-input" name="todo" />
      <button>
        <ScreenReaderOnly>Create new todo</ScreenReaderOnly>
        <span aria-hidden>+</span>
      </button>
    </Form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const description = form.elements.todo.value.trim();
    if (description.length > 0) {
      onCreateTodo(description);
    }
  }
}

const Form = styled.form`
  display: grid;
  gap: 6px;
  grid-template-columns: auto 48px;

  label {
    grid-column: span 2;
  }
`;
