import {createSlice} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "slice",
    initialState: {
        selectedStages:[],
        currentVacancyItem: {},
        vacancyList: [
            {
                id: 1,
                name: "Вакансия 1",
                stages: [
                    {id: 1, name: "Этап 11", selected: false},
                    {id: 2, name: "Этап 22", selected: true},
                    {id: 3, name: "Этап 33", selected: true},
                    {id: 4, name: "Этап 44", selected: false},
                    {id: 5, name: "Этап 55", selected: false},
                ]
            },
            {
                id: 2,
                name: "Вакансия 2",
                stages: [
                    {id: 6, name: "Этап 1", selected: false},
                    {id: 7, name: "Этап 2", selected: false},
                    {id: 8, name: "Этап 3", selected: false},
                    {id: 9, name: "Этап 4", selected: false},
                    {id: 10, name: "Этап 5", selected: true},
                ]
            },
            {
                id: 3,
                name: "Вакансия 3",
                stages: [
                    {id: 11, name: "Этап 1", selected: true},
                    {id: 12, name: "Этап 2", selected: true},
                    {id: 13, name: "Этап 3", selected: true},
                    {id: 14, name: "Этап 4", selected: false},
                    {id: 15, name: "Этап 5", selected: false},
                ]
            },
            {
                id: 4,
                name: "Вакансия 4",
                stages: [
                    {id: 16, name: "Этап 1", selected: false},
                    {id: 17, name: "Этап 2", selected: false},
                    {id: 18, name: "Этап 3", selected: false},
                    {id: 19, name: "Этап 4", selected: false},
                    {id: 20, name: "Этап 5", selected: false},
                ]
            },
            {
                id: 5,
                name: "Вакансия 5",
                stages: [
                    {id: 21, name: "Этап 1", selected: true},
                    {id: 22, name: "Этап 2", selected: true},
                    {id: 23, name: "Этап 3", selected: true},
                    {id: 24, name: "Этап 4", selected: true},
                    {id: 25, name: "Этап 5", selected: true},
                ]
            },
        ]
    },
    reducers: {
        selectVacancy: (state, action) => {
            const foundVacancy = state.vacancyList.find((vacancyItem) => vacancyItem.id === action.payload.id)
            state.currentVacancyItem = foundVacancy
        },
        clearCurrentVacancyItem: (state) => {
            state.currentVacancyItem = {}
        },
        selectStage: (state, action) => {
            //ищем этап сначала в текущем поле вакансии
            const foundCurrentStage = state.currentVacancyItem.stages.find((stageItem) => stageItem.id === action.payload.stageId)
            //меняем на противополжное значение
            if(foundCurrentStage){
                foundCurrentStage.selected=!foundCurrentStage.selected
            }
            //ищем в массиве трушных и перемещенных этапов
            const foundedStagesInSelectedStages=state.selectedStages.find(item=>item.id===action.payload.stageId)
            //если находим то меняем значение
            if(foundedStagesInSelectedStages){
                foundedStagesInSelectedStages.selected=!foundedStagesInSelectedStages.selected
            }
            //потом находим вакансию в базовом листе совпадающую с текущей вакансией
            const foundVacancy=state.vacancyList.find((vacancyItem) => vacancyItem.id === state.currentVacancyItem.id)
            //и в ней тоже ищем выбранный этап
            const foundedStage=foundVacancy.stages.find((stageItem)=>stageItem.id===action.payload.stageId)
            //и меняем в нем значение на подобное в этапе текущей вакансии
            foundedStage.selected=!foundedStage.selected

        },
        //стрелка вправо
        moveSelectedStagesIntoSelectedStagesList:(state)=>{
            //находим все трушные этапы
            const selectedStagesFromCurrentVacancyItem=state.currentVacancyItem.stages.filter((stageItem)=>stageItem.selected)
            //добавляем в массив выбранных этапов(через пуш не работает)
            state.selectedStages=[...state.selectedStages,...selectedStagesFromCurrentVacancyItem]
            //отфильтровываем все трушные этапы из текущей вакансии
            state.currentVacancyItem.stages=state.currentVacancyItem.stages.filter((stageItem)=>!stageItem.selected)
        },
        //стрелка влево
        moveSelectedStagesIntoCurrencyVacancyStages:(state)=>{
            //закидываем обратно в этапы текущей вакансии
            state.currentVacancyItem.stages=[...state.currentVacancyItem.stages,...state.selectedStages]
            //чистим массив выбранных этапов
            state.selectedStages=[]
        }

    }
})