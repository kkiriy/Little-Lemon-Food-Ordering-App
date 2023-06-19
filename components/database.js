import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, name text, price text, category text, image text, description text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function dropTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'drop table if exists menuitems;'
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
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("INSERT INTO menuitems (name, price, category, image, description) VALUES "
          + menuItems.map((item) => `('${item.name}', '${item.price}', '${item.category}', '${item.image}', '${item.description.replace("'", "")}')`).join(', '))
    }, reject, resolve)
  })
}

export async function filterByQueryAndCategories(query, activeCategories) {
  const sql = 'SELECT * FROM menuitems WHERE category IN ('
    + activeCategories.map((e) => ` ? `).join(', ') + ') '
    + (query ? "AND name LIKE '%"+ query +"%'" : "") // Expo-Sqlite is not parsing correct inside the %?%

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          sql
          , [...activeCategories]
          , (_, { rows }) => {
            resolve(rows._array)
          }
          , (error) => console.log(error)
        )
    })
  })
}
