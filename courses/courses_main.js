import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export class Courses extends React.Component {

  constructor(props) {
    super(props);
    this._fetchCourses = this._fetchCourses.bind(this);
    this._renderCourses = this._renderCourses.bind(this);
    this.state = {
      courses : { },
      isLoading : true,
    }
  }

  componentDidMount() {
    this._fetchCourses();
  }

  _fetchCourses() {
    // TODO (caseytaka): Fix URL
    fetch('http://127.0.0.1:3000/api/courses', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})
      .then(function(response) {
        return response.json();
      })
      .then(function(responseData) {
        this.setState({ courses: responseData, isLoading: false });
      }.bind(this))
      .catch(function(error) {
        // TODO (caseytaka): Display correct toastr error msg
        console.error(error);
      });
  }

  _renderCourses() {
    // return this.state.courses.map((course) => {
    //   <Text key={course.id}>{ course.id } { course.title }</Text>
    // });
    return (
      <FlatList
        data={this.state.courses}
        renderItem={(course) => <Text>{course.id} {course.title}</Text>}
        keyExtractor={(course) => course.id}
      />
    );
  }

  render() {
    let courses;
    if (this.state.isLoading) {
      courses = (
        <Text>Loading...</Text>
      )
    } else {
      courses = this._renderCourses()
    }
    return (
      <View style={courseStyles.container}>
        { courses }
      </View>
    );
  }
}

const courseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
