import { annData, diffData, freeData } from '../func/loanCalc'

const initialState = {
    loanSum: 1000000,
    loanTime: 36,
    loanRate: 16,
    loanType: 0, //0 - ann, 1 - diff, 2 - free
    loanData: annData(1000000, 0.16, 36),
    chart: true,
    freeData: []
};

export default function main(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_RATE':
            {
                var func;
                switch (state.loanType) {
                    case 0: { func = (sum, rate, time) => annData(sum, rate, time); break; }
                    case 1: { func = (sum, rate, time) => diffData(sum, rate, time); break; }
                    case 2: { func = (sum, rate, time, data) => freeData(sum, rate, time, data); break; }
                    default: null;
                }
                switch (action.number) {
                    case 1: {
                        return { ...state, loanSum: action.value, loanData: func(action.value, state.loanRate / 100, state.loanTime, state.loanData), chart: action.chart }
                    }
                    case 2: {
                        return { ...state, loanTime: action.value, loanData: func(state.loanSum, state.loanRate / 100, action.value, state.loanData), chart: action.chart }
                    }
                    case 3: {
                        return { ...state, loanRate: action.value, loanData: func(state.loanSum, action.value / 100, state.loanTime, state.loanData), chart: action.chart }
                    }
                    default:
                        return state
                }
            }
        case 'CHANGE_DATA':
            return { ...state, loanData: action.data, chart: false }

        case 'CHANGE_CHART': {
            return { ...state, chart: true }
        }
        case 'CHANGE_TYPE': {
            switch (action.number * 1) {
                case 0: {
                    return { ...state, loanData: annData(state.loanSum, state.loanRate / 100, state.loanTime), loanType: 0 }
                }
                case 1: {
                    return { ...state, loanData: diffData(state.loanSum, state.loanRate / 100, state.loanTime), loanType: 1 }
                }
                case 2: {
                    return { ...state, loanData: freeData(state.loanSum, state.loanRate / 100, state.loanTime, state.loanData), loanType: 2 }
                }
                default:
                    return state;
            }
        }
        case 'CHANGE_FREE_DATA': {
            var newFreeData = state.loanData,
                index = action.index;
            newFreeData[index].monthSum = action.value;
            newFreeData[index].show = action.show;
            return { ...state, loanData: freeData(state.loanSum, state.loanRate / 100, state.loanTime, newFreeData)}
        }

        default:
            return state
    }
}