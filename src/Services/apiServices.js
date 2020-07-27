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
  let borders = new Array(arr.length);
  await Promise.all(
    arr.map(async (item, i) => {
      let url = `https://restcountries.eu/rest/v2/alpha/${item}`;
      let resp = await fetch(url);
      let data = await resp.json();
      borders[i] = data.name;
    })
  );
  return borders;
};
