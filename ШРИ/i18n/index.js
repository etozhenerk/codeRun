module.exports = function getI18nText({
  stringTokens,
  variables,
  translations,
  locale,
}) {
  // ваш код здесь
  let i18nText = "";

  const localeTranslations = translations[locale];

  const getFormatDate = (date) => {
    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });

    return formatter.format(new Date(date));
  };

  const getNumber = (number, currency) => {
    const config = currency
      ? {
          style: "currency",
          currency,
        }
      : {};
    const formatter = new Intl.NumberFormat(locale, config);
    return formatter.format(number);
  };

  const getPlural = (rules, number) => {
    const formatter = new Intl.PluralRules(locale);
    const text = rules[formatter.select(number)];

    return `${getNumber(number)}${text}`;
  };

  const getList = (...items) => {
    const formatter = new Intl.ListFormat(locale, {
      type: "conjunction",
    });
    return formatter.format(items);
  };

  const getRelativeTime = (value, init) => {
    const formatter = new Intl.RelativeTimeFormat(locale);

    return formatter.format(value, init);
  };

  const formatters = {
    "@date": getFormatDate,
    "@number": getNumber,
    "@plural": getPlural,
    "@list": getList,
    "@relativeTime": getRelativeTime,
  };

  const formatVelue = (value) => {
    if (parseInt(value)) {
      return value;
    } else {
      if (value.startsWith("#")) {
        const key = value.slice(1);
        return localeTranslations ? localeTranslations[key] : "";
      } else if (value.startsWith("$")) {
        const key = value.slice(1);
        return variables[key];
      } else {
        return value;
      }
    }
  };

  const formatTokens = (tokens) => {
    const currFunction = formatters[tokens[0]];
    const args = tokens
      .slice(1)
      .map((item) => formatVelue(item))
      .filter((item) => !!item);
    return currFunction(...args);
  };

  for (let i = 0; i < stringTokens.length; i++) {
    const token = stringTokens[i];
    if (Array.isArray(token)) {
      const value = formatTokens(token);
      i18nText += value;
    } else {
      const value = formatVelue(token);
      i18nText += value;
    }
  }

  return i18nText; // строка
};
