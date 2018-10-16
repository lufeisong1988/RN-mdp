import { combineReducers } from 'redux';
import Login from './LoginReducer'
import Ad from './AdReducer'
import Notice from './NoticeReducer'
import Recommend from './RecommendReducer'
import QuoteForApp from './QuoteForAppReducer'
import Article from './ArticleReducer'
import UserInfo from './UserInfoReducer'
import ActivityList from './ActivityListReducer'
import ActivityDetail from './ActivityDetailReducer'
import TrendDomainAndType from './TrendDomainAndTypeReducer'
import AllQuote from './AllQuoteReducer'
import AnalyseAreaInfo from './AnalyseAreaInfoReducer'
import AnalyseQuoteList from './AnalyseQuoteListReducer'
import StrategyInit from './StrategyInitReducer'
import StrategyGetTraget from './StrategyGetTragetReducer'
import StrategyGetTragetData from './StrategyGetTragetDataReducer'
import StrategyGetPaper from './StrategyGetPaperReducer'
const rootReducer = combineReducers({
    Login,
    Ad,
    Notice,
    Recommend,
    QuoteForApp,
    Article,
    UserInfo,
    ActivityList,
    ActivityDetail,
    TrendDomainAndType,
    AllQuote,
    AnalyseAreaInfo,
    AnalyseQuoteList,
    StrategyInit,
    StrategyGetTraget,
    StrategyGetTragetData,
    StrategyGetPaper,
});
export default rootReducer;