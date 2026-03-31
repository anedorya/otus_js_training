import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ChildForm from './ChildForm';

describe('ChildForm Component', () => {

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('должен корректно рендерить заголовок', () => {
    render(<ChildForm />);

    const headingElement = screen.getByRole('heading', { level: 2, name: /Заполните анкету на вашего ребенка/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('должен переключать видимость формы при клике на заголовок', async () => {
    const user = userEvent.setup();
    render(<ChildForm />);
    const header = screen.getByText(/Заполните анкету на вашего ребенка/i);
    const contentDiv = screen.getByTestId('form-content');

    // Изначально скрыто
    expect(contentDiv).toHaveClass('form__content--hide');

    // Клик для показа
    await user.click(header);
    expect(contentDiv).toHaveClass('form__content--show');

    // Клик для скрытия
    await user.click(header);
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

    expect(submitBtn).toBeEnabled();
    await user.type(ageInput, '10');

    // Проверка значений
    expect(nameInput).toHaveValue('Иван');
    expect(emailInput).toHaveValue('ivan@test.com');
    expect(ageInput).toHaveValue('10');
    
    // Отправка
    await user.click(submitBtn);
    
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Иван',
      email: 'ivan@test.com',
      age: '10'
    }));
    
    consoleSpy.mockRestore();

  });


it('не должен отправлять форму с пустыми полями', async () => {
  const user = userEvent.setup();
  const consoleSpy = vi.spyOn(console, 'log');
  
  render(<ChildForm />);
  
  // Открываем форму
  await user.click(screen.getByText(/Заполните анкету на вашего ребенка/i));
  
  const submitBtn = screen.getByRole('button', { name: /Отправить/i });
  
  // Пытаемся отправить пустую форму
  await user.click(submitBtn);
  
  // Проверяем, что console.log НЕ был вызван
  expect(consoleSpy).not.toHaveBeenCalled();
  
  // Проверяем, что поля все еще пустые
  const nameInput = screen.getByLabelText(/Имя:/i);
  const emailInput = screen.getByLabelText(/Email:/i);
  const ageInput = screen.getByLabelText(/Age:/i);
  
  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
  expect(ageInput).toHaveValue('');
  
  consoleSpy.mockRestore();
});


});
