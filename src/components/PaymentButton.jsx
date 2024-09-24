import { useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useSelector } from 'react-redux';

const PaymentButton = () => {
  const webApp = useWebApp();

  // Получаем товары из корзины
  const cartItems = useSelector((state) => state.cart.items || []);

  useEffect(() => {
    const mainButton = webApp.MainButton;

    if (cartItems.length > 0) {
      // Устанавливаем текст и активируем кнопку, если есть товары в корзине
      mainButton.setText('Оплатить корзину');
      mainButton.show();
      mainButton.enable();
    } else {
      // Прячем кнопку, если корзина пуста
      mainButton.hide();
    }

    // Обработчик нажатия на MainButton
    mainButton.onClick(() => {
      if (!cartItems.length) {
        console.error('Корзина пуста. Оплата невозможна.');
        return;
      }

      // Формируем список товаров и общую сумму
      const prices = cartItems.map((item) => ({
        label: item.jewelry.title,
        amount: item.jewelry.price * 100, // Конвертируем в минимальные единицы валюты
      }));

      const totalAmount = prices.reduce((sum, priceItem) => sum + priceItem.amount, 0);

      const invoice = {
        title: 'Оплата товаров из корзины',
        description: 'Оплата за ювелирные изделия из вашей корзины.',
        payload: 'unique_payload',
        provider_token: '381764678:TEST:MzA3OTEyNTg1N2Jh', // Токен платежного провайдера
        currency: 'USD',
        prices: prices,
        total_amount: totalAmount,
      };

      // Открытие инвойса для оплаты
      webApp.openInvoice(invoice);
    });

    // Очищаем обработчик при размонтировании компонента
    return () => {
      mainButton.offClick();
      mainButton.hide();
    };
  }, [cartItems, webApp]);

  return null; // Компонент не рендерит никакие элементы
};

export default PaymentButton;
