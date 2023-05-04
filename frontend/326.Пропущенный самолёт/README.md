Пропущенный самолёт

Девушка Ромы очень торопится вылететь, но из-за ошибок в коде формы резервирования билетов она не может этого сделать.

Почините ошибки, чтобы форма работала корректно и отдавала в функции onReserveFlight и onAvailableFlights правильные значения.

Код формы можно найти в конце описания

Примечание
Нужно отправить код исправленного React компонента, нельзя импортировать новые библиотеки.

Использовать React можно только через глобальную среду, например React.useState или React.useEffect, а не useState или useEffect.

Строки с импортом React, т.е. import React from 'react'; перед компонентом Form перед отправкой нужно удалить.

Экспортировать компонент Form не нужно.

Код формы:

/**
 * onReserveFlight: (flight: string) => void; - Функция, в которую передается выбранный рейс. Вызвать один раз
 * onAvailableFlights: (availableFlights: string[]) => void; - Функция, в которую передаются все доступные рейсы. Вызывать на каждом обновлении списка доступныъх рейсов
 * getSuggestionsFromServer: (callback: (suggestions: string[]) => void) => void; - Функция, в коллбек которой приходит список доступных рейсов.
 */
const Form = ({
  onReserveFlight,
  onAvailableFlights,
  getSuggestionsFromServer,
}) => {
  // Модифицировать код можно только внутри компонента Form
  const [availableFlights, setAvailableFlights] = React.useState([]); // Например, ['Moscow', 'Paris', 'Milan']
  const [pickedFlight, setPickedFlight] = React.useState(null);

  React.useEffect(() => {
    getSuggestionsFromServer((data) => {
      setAvailableFlights(data);

      // Не удаляйте эту строчку
      setPickedFlight(data[0]);
    });
  }, [getSuggestionsFromServer]);

  React.useEffect(() => {
    if (onAvailableFlights) {
      onAvailableFlights(availableFlights);
    }
  }, [onAvailableFlights, availableFlights]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    onReserveFlight(pickedFlight);
  };

  const onChooseFlight = (choosenFlight) => {
    setPickedFlight(choosenFlight);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <ul>
        Доступные рейсы:
        {availableFlights.map((availableFlight) => (
          <li
            key={1}
            onClick={() => onChooseFlight(availableFlight)}
            style={{
              ...(availableFlight === pickedFlight && {
                border: "1px solid red"
              })
            }}
          >
            {availableFlight}
          </li>
        ))}
      </ul>

      {/* Не меняйте аттрибут value у этого элемента */}
      <input type="button" value="Submit" />
    </form>
  );
};