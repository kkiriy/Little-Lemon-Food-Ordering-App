import {useRef, useEffect} from 'react';

  
export function getSectionListData(data) {

  //console.log('This is the passed database')
  //console.log(data)
  //console.log('------------------------------------------------')
  //var i = 0;
  const dataByCategory = data.reduce((acc, curr) => {
    const menuItem = {
      //id: i,
      key: curr.id,
      id: curr.id,
      //uuid: i,
      name: curr.name,
      price: curr.price,
      description: curr.description,
    };
    //i = i+1;
    //console.log(`-- telling:${i}---`)
    if (!Array.isArray(acc[curr.category])) {
      acc[curr.category] = [menuItem];
    } else {
      acc[curr.category].push(menuItem);
    }
    //console.log('Dit is het omgezette object')
    //console.log(acc)
    //console.log('------------------------------------------------')
  
    return acc;
  }, {});
  const sectionListData = Object.entries(dataByCategory).map(([key, item]) => {
    return {
      title: key,
      data: item,
    };
  });
  //console.log('This is the current object for the sectionlist')
  //console.log(sectionListData)
  //console.log(sectionListData[0])
  //console.log(sectionListData[1])
  //console.log(sectionListData[2])
  //console.log('------------------------------------------------')
  return sectionListData;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}