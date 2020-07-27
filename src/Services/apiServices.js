export const apiGetAll = async () => {
  let url = 'https://restcountries.eu/rest/v2/all';
  let resp = await fetch(url);
  let data = await resp.json();
  return data;
};

export const apiCountry = async (country) => {
  let url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
  let resp = await fetch(url);
  let data = await resp.json();
  return data;
};

export const apiCode = async (code) => {
  let url = `https://restcountries.eu/rest/v2/alpha/${code}`;
  let resp = await fetch(url);
  let data = await resp.json();
  return data;
};

export const apiBorders = async (arr) => {
  let borders = [];
  await Promise.all(
    arr.map(async (item) => {
      let url = `https://restcountries.eu/rest/v2/alpha/${item}`;
      let resp = await fetch(url);
      let data = await resp.json();
      borders.push(data.name);
    })
  );
  return borders;
};
