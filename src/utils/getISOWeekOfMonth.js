const getISOWeekOfMonth = (date) => {
    const fecha = new Date(date);
    const dia = fecha.getDate();

    // Calcular semana del 1 al 4 (sin semana 5)
    const semana = Math.min(Math.ceil(dia / 7), 4); // Forzamos máximo 4 semanas

    return semana;
};
export default getISOWeekOfMonth;