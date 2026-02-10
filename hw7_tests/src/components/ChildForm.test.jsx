import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ChildForm from './ChildForm';

describe('ChildForm Component', () => {
  it('должен корректно рендерить заголовок', () => {
    render(<ChildForm />);

    const headingElement = screen.getByRole('heading', { level: 2, name: /Заполните анкету на вашего ребенка/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('должен переключать видимость формы при клике на заголовок', () => {
    render(<ChildForm />);
    const header = screen.getByText(/Заполните анкету на вашего ребенка/i);
    const contentDiv = header.nextElementSibling;

    // Изначально скрыто (проверяем класс)
    expect(contentDiv).toHaveClass('form__content--hide');

    // Клик для показа
    fireEvent.click(header);
    expect(contentDiv).toHaveClass('form__content--show');

    // Клик для скрытия
    fireEvent.click(header);
    expect(contentDiv).toHaveClass('form__content--hide');
  });

  it('позволяет вводить данные в поля и отправлять форму', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log');
    
    render(<ChildForm />);
    
    // Открываем форму
    await user.click(screen.getByText(/Заполните анкету на вашего ребенка/i));

    const nameInput = screen.getByLabelText(/Имя:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const ageInput = screen.getByLabelText(/Age:/i);
    const submitBtn = screen.getByRole('button', { name: /Отправить/i });

    // Эмуляция ввода
    await user.type(nameInput, 'Иван');
    await user.type(emailInput, 'ivan@test.com');
    await user.type(ageInput, '10');

    // Проверка значений
    expect(nameInput.value).toBe('Иван');
    
    // Отправка
    await user.click(submitBtn);
    
    expect(submitBtn).toBeEnabled();

  });
});
