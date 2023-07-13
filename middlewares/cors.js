module.exports = (req, res, next) => {
  const { method } = req; // Записываем в переменную method соответствующий заголовок

  res.header('Access-Control-Allow-Origin', '*'); // Устанавливаем заголовок, который позволяет запросы с любого домена
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Добавляем заголовок "Authorization" в список разрешенных заголовков
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE'); // Устанавливаем заголовок, который разрешает браузеру отправлять дополнительные заголовки в запросе

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // отправляем HTTP OK статус для предварительного запроса
    return res.status(200).end();
  }

  next();

  return null;
};
