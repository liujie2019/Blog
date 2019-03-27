import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';

// ownProps代表容器组件的props
const mapStateToProps = (state, ownProps) => {
    return {
        // All、Active和Completed分别是3个容器组件
        // 当容器组件的filter和当前状态的visibilityFilter相等时，该按钮不可点击
        active: ownProps.filter === state.visibilityFilter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}

// 注入active和onClick，这样就可以在Link展示组件中使用
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);