import { useRef, useEffect } from 'react';

export function getSectionListData(data) {
  let sections = []
  data.map(e => {
    let newItem = false
    let obj = sections.find(o => {
      return o.name === e.category
    })
    if (obj === undefined) {
      obj = {}
      obj.data = []
      obj.name = e.category
      newItem = true
    }

    obj.data.push({
      name: e.name,
      price: e.price,
      description: e.description,
      image: e.image
    })
    if (newItem) sections.push(obj)
  })

  return sections;
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
