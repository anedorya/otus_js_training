import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import '@testing-library/jest-dom/vitest'



describe('App Component', () => {
  
  it('должен корректно отображать заголовок "Привет!"', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', { level: 2, name: /Привет!/i });
    expect(headingElement).toBeInTheDocument('heading');
  });

});

// Мокаем дочерние компоненты, чтобы протестировать App изолированно
vi.mock('./components/UserForm', () => ({
  default: () => <div data-testid="user-form">User Form Component</div>
}));

vi.mock('./components/ChildForm', () => ({
  default: () => <div data-testid="child-form">Child Form Component</div>
}));


describe('App Component', () => {
  
  it('должен рендерить компонент UserForm', () => {
    render(<App />);
    const userForm = screen.getByTestId('user-form');
    expect(userForm).toBeInTheDocument();
  });

  it('должен рендерить компонент ChildForm', () => {
    render(<App />);
    const childForm = screen.getByTestId('child-form');
    expect(childForm).toBeInTheDocument();
  });


});
