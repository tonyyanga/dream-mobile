import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class CoursesScreen extends React.Component {

  static navigationOptions = {
    title: 'Show Courses',
  };

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
    return this.state.courses.map(function(course, i) {
      return(
        <View key={i}>
          <Text>{course.id} {course.title}</Text>
        </View>
      );
    });
  }

  render() {
    let courses;
    if (this.state.isLoading) {
      // TODO (casey): Add loading gif.
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
