import * as SQLite from 'expo-sqlite';
 
const db = SQLite.openDatabase('little_lemon');

export async function dropTable() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
        tx.executeSql(
          'drop table if exists menuitems;'
        );
      },
      reject,
      resolve
    );
  });
}

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text, name text, price text, category text, description text);',
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from menuitems', 
        [], 
        (_, { rows }) => {resolve(rows._array);}
      );
    },
    );
  });
}

export function saveMenuItems(menuItems) {
  //console.log('This is the stored database')
  //console.log(menuItems.map( (item) =>  `('${item.id}', '${item.name}', '${item.price}', '${item.category}', '${item.description.replace("'","\\'" )}')` ).join(', ') )
  //console.log('------------------------------------------------')
  /*
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `insert into menuitems (uuid, name, price, category, description) values 
        ('1', 'Greek Salad', '12.99', 'starters', 'Our delicious salad is served with Feta cheese and peeled cucumber. Includes tomatoes, onions, olives, salt and oregano in the ingredients.'),
        ('2', 'Bruschetta', '7.99', 'starters', 'Delicious grilled bread rubbed with garlic and topped with olive oil and salt. Our Bruschetta includes tomato and cheese.'),
        ('3', 'Grilled Fish', '20', 'mains', 'Fantastic grilled fish seasoned with salt.'),
        ('4', 'Pasta', '6.99', 'mains', 'Delicious pasta for your delight.'), 
        ('5', 'Lemon Dessert', '4.99', 'desserts', 'You cant go wrong with this delicious lemon dessert!');`,
        [],
        (_, { rows }) => {resolve(rows._array);}
      );
    });
  })
  */
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `insert into menuitems (uuid, name, price, category, description) values ${menuItems
          .map(
            (item) =>
              `('${item.id}', '${item.name}', '${item.price}', '${item.category}', '${item.description.replace("n't","n not" )}')`
          )
          .join(', ')};`,
        [],
        (_, { rows }) => {resolve(rows._array);}
      );
    });
  })
}

export async function filterByQueryAndCategories(query, activeCategories) {
  //console.log('This is the given query')
  //console.log(query)
  //console.log('These are the given filters')
  //console.log(activeCategories)
  //console.log(activeCategories.map( (category) =>  `category="${category}"` ).join(' or '))
  //console.log('------------------------------------------------')
  return new Promise((resolve, reject) => {
    if (!query) {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuitems where ${activeCategories
            .map((category) => `category='${category}'`)
            .join(' or ')};`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
            //console.log(rows);
          }
        );
      }, reject
      );
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuitems where (name like '%${query}%') and (${activeCategories
            .map((category) => `category='${category}'`)
            .join(' or ')});`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject
      );
    }
  });
}

