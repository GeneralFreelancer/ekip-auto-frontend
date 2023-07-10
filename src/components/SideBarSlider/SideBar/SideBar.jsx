import React from "react";
import style from './SideBar.module.scss';
import CategoryItem from "../../CategoryItem";


const mockCategoryName = [
  {
    id: "1",
    title: "Автоаксесуари",
    subCategory: [
      
    ],
  },
  {
    id: "2",
    title: "Led та освітлення",
    subCategory: [
      {
        id: "56789ijh",
        title: "Автоаксесуари",
        subCategory: [
          {
            id: "1-1",
            title: ""
          },
        ],
      },
      {
        id: "98iuhb",
        title: "Led та освітлення",
        subCategory: [
          {
            id: "64635",
            title: ""
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Фари",
    subCategory: [
     
    ],
  },
  {
    id: "4",
    title: "Декоративне світло",
    subCategory: [
      
    ],
  },
  {
    id: "5",
    title: "Електронні компоненти",
    subCategory: [
      
    ],
  },
  {
    id: "6",
    title: "Кабельна продукція",
    subCategory: [
      {
        id: "1",
        title: "Автоаксесуари",
        subCategory: [
          {
            id: "1-1",
            title: ""
          },
        ],
      },
      {
        id: "2",
        title: "Led та освітлення",
        subCategory: [
          {
            id: "64635",
            title: ""
          },
        ],
      },
      {
        id: "3",
        title: "Фари",
        subCategory: [
          {
            id: "987",
            title: ""
          },
        ],
      },
      {
        id: "4",
        title: "Декоративне світло",
        subCategory: [
          {
            id: "1fg5",
            title: ""
          },
        ],
      },
      {
        id: "5",
        title: "Електронні компоненти",
        subCategory: [
          {
            id: "5-5",
            title: ""
          },
        ],
      },
      {
        id: "6",
        title: "Кабельна продукція",
        subCategory: [
          {
            id: "6-6",
            title: ""
          },
        ],
      },
      {
        id: "7",
        title: "Лазерне обладнання",
        subCategory: [
          {
            id: "7-7",
            title: ""
          },
        ],
      },
      {
        id: "8",
        title: "Мікрофони та аксесуари",
        subCategory: [
          {
            id: "8_8",
            title: ""
          },
        ],
      },
      {
        id: "9",
        title: "Металеві стійки, ферми",
        subCategory: [
          {
            id: "9-9",
            title: ""
          },
        ],
      },
      {
        id: "10",
        title: "Світлове обладнання",
        subCategory: [
          {
            id: "10-1",
            title: ""
          },
        ],
      },
      {
        id: "11",
        title: "Світлове обладнання",
        subCategory: [
          {
            id: "11-1",
            title: ""
          },
        ],
      },
      {
        id: "12",
        title: "Трансляційне обладнання",
        subCategory: [
          {
            id: "12-12",
            title: ""
          },
        ],
      },
      {
        id: "13",
        title: "Автоаксесуари",
        subCategory: [
          {
            id: "13-133",
            title: ""
          },
        ],
      },
      {
        id: "14",
        title: "Led та освітлення",
        subCategory: [
          {
            id: "232",
            title: ""
          },
        ],
      },
      {
        id: "15",
        title: "Фари",
        subCategory: [
          {
            id: "23235yfd",
            title: ""
          },
        ],
      },
      {
        id: "16",
        title: "Декоративне світло",
        subCategory: [
          {
            id: "1fdffdfwer",
            title: ""
          },
        ],
      },
      {
        id: "17",
        title: "Електронні компоненти",
        subCategory: [
          {
            id: "17-17",
            title: ""
          },
        ],
      },
      {
        id: "18",
        title: "Кабельна продукція",
        subCategory: [
          {
            id: "18-18",
            title: ""
          },
        ],
      },
      {
        id: "19",
        title: "Лазерне обладнання",
        subCategory: [
          {
            id: "19-19",
            title: ""
          },
        ],
      },
      {
        id: "20",
        title: "Мікрофони та аксесуари",
        subCategory: [
          {
            id: "20-20",
            title: ""
          },
        ],
      },
      {
        id: "21",
        title: "Металеві стійки, ферми",
        subCategory: [
          {
            id: "21-21",
            title: ""
          },
        ],
      },
      {
        id: "22",
        title: "Світлове обладнання",
        subCategory: [
          {
            id: "22-22",
            title: ""
          },
        ],
      },
      {
        id: "23",
        title: "Світлове обладнання",
        subCategory: [
          {
            id: "23-23",
            title: ""
          },
        ],
      },
      {
        id: "24",
        title: "Трансляційне обладнання",
        subCategory: [
          {
            id: "24-24",
            title: ""
          },
        ],
      },
    ],
  },
  {
    id: "7",
    title: "Лазерне обладнання",
    subCategory: [
      
    ],
  },
  {
    id: "8",
    title: "Мікрофони та аксесуари",
    subCategory: [
      
    ],
  },
  {
    id: "9",
    title: "Металеві стійки, ферми",
    subCategory: [
      
    ],
  },
  {
    id: "10",
    title: "Світлове обладнання",
    subCategory: [
      
    ],
  },
  {
    id: "11",
    title: "Світлове обладнання",
    subCategory: [
      
    ],
  },
  {
    id: "12",
    title: "Трансляційне обладнання",
    subCategory: [
      
    ],
  },
  {
    id: "13",
    title: "Автоаксесуари",
    subCategory: [
      
    ],
  },
  {
    id: "14",
    title: "Led та освітлення",
    subCategory: [
     
    ],
  },
  {
    id: "15",
    title: "Фари",
    subCategory: [
     
    ],
  },
  {
    id: "16",
    title: "Декоративне світло",
    subCategory: [
      
    ],
  },
  {
    id: "17",
    title: "Електронні компоненти",
    subCategory: [
     
    ],
  },
  {
    id: "18",
    title: "Кабельна продукція",
    subCategory: [
     
    ],
  },
  {
    id: "19",
    title: "Лазерне обладнання",
    subCategory: [
      
    ],
  },
  {
    id: "20",
    title: "Мікрофони та аксесуари",
    subCategory: [
      
    ],
  },
  {
    id: "21",
    title: "Металеві стійки, ферми",
    subCategory: [
      
    ],
  },
  {
    id: "22",
    title: "Світлове обладнання",
    subCategory: [
     
    ],
  },
  {
    id: "23",
    title: "Світлове обладнання",
    subCategory: [
      
    ],
  },
  {
    id: "24",
    title: "Трансляційне обладнання",
    subCategory: [
      
    ],
  },
];

const SideBar = () => {

  return(
    <div className={style.wrapper} >
      <CategoryItem key={'2'} styleItem={'sidebar'} data={mockCategoryName}/>
    </div>
  ); 
};

export default SideBar;
