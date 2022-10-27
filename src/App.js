import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {slice} from "./BLL/slice";

function App() {

    return (
        <div className="App">
            <div className="Title">
                <h3>as</h3>
                <h3>sa</h3>
            </div>
            <div className="ContentBlock">
                <div className="ContentItem">
                    <h3>vacancy</h3>
                    <VacancyList/>
                </div>
                <div className="ContentItem">
                    <h3>stage</h3>
                    <StageList/>
                </div>
                <div className={"ContentItem"}>
                    <ArrowBar/>
                </div>
                <div className="ContentItem">
                    <h3>selected stage</h3>
                    <SelectedStages/>
                </div>
            </div>

        </div>
    );
}

export default App;

const SelectedStages = () => {
    const selectedStageList = useSelector(state => state.slice.selectedStages)
    const dispatch = useDispatch()
    const unselectStage = (stageId) =>()=> {
        dispatch(slice.actions.selectStage({stageId}))
    }
    console.log(selectedStageList)
    return <>
        {
            selectedStageList.map(item =>
                <h5 style={{color: item.selected ? "green" : "inherit"}}
                    key={item.id}
                    onClick={unselectStage(item.id)}
                >
                    {item.name}
                </h5>)
        }
    </>
}

const ArrowBar = () => {
    const dispatch = useDispatch()

    const moveRight = () => {
        dispatch(slice.actions.moveSelectedStagesIntoSelectedStagesList({}))
    }
    const moveLeft = () => {
        dispatch(slice.actions.moveSelectedStagesIntoCurrencyVacancyStages({}))
    }

    return <>
        <h1 onClick={moveRight}>{`${'>>>'}`}</h1>
        <h1 onClick={moveLeft}>{`${'<<<'}`}</h1>
    </>
}

const StageList = () => {
    const stageList = useSelector(state => state.slice.currentVacancyItem.stages)
    const dispatch = useDispatch()
    const onClickHandler = (stageId) => () => {
        dispatch(slice.actions.selectStage({stageId}))
    }
    return (
        <>
            {
                stageList ?
                    <>
                        {
                            stageList.map((item) =>
                                <span style={{color: item.selected ? "red" : "inherit"}}
                                      onClick={onClickHandler(item.id)}
                                      key={item.id}
                                >
                                    <h5>{`${item.name}`}{item.selected && '  =>'}</h5>


                                </span>)
                        }
                    </>
                    : <></>
            }
        </>
    )
}

const VacancyList = () => {
    const vacancyList = useSelector(state => state.slice.vacancyList)
    const dispatch = useDispatch()

    const onClickHandler = (id) => () => {
        dispatch(slice.actions.selectVacancy({id}))
    }


    return (
        <>
            {vacancyList.map((item) =>
                <h5 onClick={onClickHandler(item.id)}
                    key={item.id}
                >
                    {item.name}
                </h5>)}
        </>
    )
}
