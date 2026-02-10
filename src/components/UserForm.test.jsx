import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import UserForm from './UserForm';

describe('UserForm Component', () => {
  it('отрисовывает все input через placeholder', () => {
    render(<UserForm />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Age')).toBeInTheDocument();
  });

  it('пограничный случай: форма отправляется с пустыми полями', async () => {
    const user = userEvent.setup();
    render(<UserForm />);
    
    await user.click(screen.getByText(/Заполните свою анкету/i));
    
    const submitBtn = screen.getByRole('button', { name: /Отправить/i });
    
    await user.click(submitBtn);
    
    expect(submitBtn).toBeEnabled();
  });
});
