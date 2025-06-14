'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Bug,
  Calendar,
  Clock,
  FileText,
  Globe,
  Microscope,
  Play,
  TrendingUp,
  Users2
} from 'lucide-react';

const USER_STATS = [
  {
    title: 'Courses Enrolled',
    value: '8',
    icon: BookOpen,
    description: 'Active learning paths',
    color: 'green',
    progress: 75
  },
  {
    title: 'Events Attended',
    value: '12',
    icon: Calendar,
    description: 'Field expeditions completed',
    color: 'gray',
    progress: 60
  },
  {
    title: 'Certificates Earned',
    value: '5',
    icon: Award,
    description: 'Research achievements',
    color: 'green',
    progress: 85
  },
  {
    title: 'Study Hours',
    value: '142',
    icon: Clock,
    description: 'Total learning time',
    color: 'gray',
    progress: 90
  }
];

const CURRENT_COURSES = [
  {
    title: 'Advanced Butterfly Taxonomy',
    progress: 85,
    instructor: 'Dr. Maya Patel',
    nextLesson: 'Wing Pattern Analysis',
    duration: '45 min',
    difficulty: 'Advanced',
    color: 'green'
  },
  {
    title: 'Field Research Methods',
    progress: 60,
    instructor: 'Prof. James Wilson',
    nextLesson: 'Data Collection Techniques',
    duration: '30 min',
    difficulty: 'Intermediate',
    color: 'gray'
  },
  {
    title: 'Invertebrate Ecology',
    progress: 30,
    instructor: 'Dr. Sarah Chen',
    nextLesson: 'Ecosystem Interactions',
    duration: '25 min',
    difficulty: 'Beginner',
    color: 'green'
  }
];

const UPCOMING_EVENTS = [
  {
    title: 'Western Ghats Expedition',
    date: 'June 15, 2025',
    location: 'Kerala, India',
    spots: '3 spots left',
    type: 'Field Trip',
    icon: Globe,
    color: 'green'
  },
  {
    title: 'Butterfly Photography Workshop',
    date: 'June 22, 2025',
    location: 'Online',
    spots: 'Open enrollment',
    type: 'Workshop',
    icon: Users2,
    color: 'gray'
  },
  {
    title: 'Research Paper Presentation',
    date: 'July 5, 2025',
    location: 'Institute Campus',
    spots: 'Registered',
    type: 'Conference',
    icon: FileText,
    color: 'green'
  }
];

const RECENT_ACHIEVEMENTS = [
  {
    title: 'Course Completion',
    description: 'Completed "Introduction to Entomology"',
    badge: 'Certificate Earned',
    time: '2 days ago',
    icon: Award,
    color: 'green'
  },
  {
    title: 'Field Study',
    description: 'Participated in coastal biodiversity survey',
    badge: 'Field Experience',
    time: '1 week ago',
    icon: Microscope,
    color: 'gray'
  },
  {
    title: 'Research Contribution',
    description: 'Data submitted for butterfly migration study',
    badge: 'Research Credit',
    time: '2 weeks ago',
    icon: Bug,
    color: 'green'
  }
];

const UserDashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome back, Student!
            </h1>
            <p className="text-lg text-gray-600">
              Continue your journey in invertebrate zoology research and discovery.
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="rounded-2xl bg-gradient-to-r from-green-50 via-white to-gray-50 border border-green-100 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Learning Progress</h3>
              <p className="text-sm text-gray-600">You're making great progress! Keep up the excellent work.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">78%</div>
                <div className="text-xs text-gray-500">Overall Progress</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {USER_STATS.map((stat, index) => (
          <Card key={index} className="group relative overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-xl ${
                stat.color === 'green' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <stat.icon className={`h-4 w-4 ${
                  stat.color === 'green' ? 'text-green-600' : 'text-gray-600'
                }`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.description}</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-700">{stat.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        stat.color === 'green' ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                      style={{ width: `${stat.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Hover effect overlay */}
            <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
              stat.color === 'green'
                ? 'bg-gradient-to-br from-green-500/5 to-green-600/5'
                : 'bg-gradient-to-br from-gray-500/5 to-gray-600/5'
            }`} />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Current Courses */}
        <Card className="lg:col-span-2 border border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold text-gray-900">Continue Learning</CardTitle>
                <CardDescription>Your active courses and next lessons</CardDescription>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                View All Courses
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {CURRENT_COURSES.map((course, index) => (
              <div key={index} className="group p-4 rounded-xl border border-gray-200 hover:border-green-200 hover:bg-green-50/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {course.title}
                    </h4>
                    <p className="text-sm text-gray-600">by {course.instructor}</p>
                  </div>
                  <Badge variant="outline" className={`${
                    course.difficulty === 'Advanced' ? 'bg-red-50 text-red-700 border-red-200' :
                    course.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                    'bg-green-50 text-green-700 border-green-200'
                  }`}>
                    {course.difficulty}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        course.color === 'green' ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Next: <span className="font-medium text-gray-900">{course.nextLesson}</span>
                    </div>
                    <Button size="sm" variant="outline" className="group/btn">
                      <Play className="h-3 w-3 mr-1 group-hover/btn:text-green-600" />
                      {course.duration}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Achievements</CardTitle>
            <CardDescription>Your latest accomplishments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {RECENT_ACHIEVEMENTS.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-xl ${
                  achievement.color === 'green' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <achievement.icon className={`h-4 w-4 ${
                    achievement.color === 'green' ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{achievement.title}</h4>
                    <span className="text-xs text-gray-500">{achievement.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <Badge variant="outline" className={`text-xs ${
                    achievement.color === 'green'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {achievement.badge}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold text-gray-900">Upcoming Events</CardTitle>
              <CardDescription>Field expeditions and workshops you can join</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              View All Events
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {UPCOMING_EVENTS.map((event, index) => (
              <div key={index} className="group p-4 rounded-xl border border-gray-200 hover:border-green-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-xl ${
                      event.color === 'green' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <event.icon className={`h-4 w-4 ${
                        event.color === 'green' ? 'text-green-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {event.title}
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>{event.date}</div>
                      <div>{event.location}</div>
                      <div className="font-medium text-green-600">{event.spots}</div>
                    </div>
                  </div>

                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboardPage;
