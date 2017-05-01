import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './courseList';
import {browserHistory} from 'react-router';

class CoursePage extends React.Component {

    constructor(props, context) {
        super(props, context);
          this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
        /*   this.state = {
               course: { title: "" }
           };
   */
        // this.onTitleChange = this.onTitleChange.bind(this); // binding cause of ES6
        // this.oncClickSave = this.oncClickSave.bind(this);
    }

    onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({ course: course });
    }

    redirectToAddCoursePage() {
        browserHistory.push('/course');
    }
    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }
    render() {
        const { courses } = this.props;
        return (
            <div >
                <h1>Courses</h1>
                <input type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage} />
                <CourseList courses={courses} />
            </div>
        );
    }
}

CoursePage.propTypes = {
    //  dispatch: PropTypes.func.isRequired, without map dispatch to Props
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispathToProps(dispatch) {
    return {
        //  createCourse: course => dispatch(courseActions.createCourse(course)) without bind action acreators
        actions: bindActionCreators(courseActions, dispatch) // all actions will be binded
    };
}

export default connect(mapStateToProps, mapDispathToProps)(CoursePage);