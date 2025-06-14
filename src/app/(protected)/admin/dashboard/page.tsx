'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  Eye,
  Mail,
  MousePointer,
  PieChart,
  RefreshCw,
  TrendingUp,
  Users
} from 'lucide-react';

const STATS_CARDS = [
  {
    title: 'Total Users',
    value: '2,847',
    change: '+12.5%',
    changeType: 'positive',
    icon: Users,
    description: 'Active registered users',
    color: 'green'
  },
  {
    title: 'Published Blogs',
    value: '156',
    change: '+8.2%',
    changeType: 'positive',
    icon: BookOpen,
    description: 'Research articles published',
    color: 'gray'
  },
  {
    title: 'Upcoming Events',
    value: '24',
    change: '+15.3%',
    changeType: 'positive',
    icon: Calendar,
    description: 'Scheduled field expeditions',
    color: 'green'
  },
  {
    title: 'Course Enrollments',
    value: '1,234',
    change: '-2.1%',
    changeType: 'negative',
    icon: Award,
    description: 'Students enrolled this month',
    color: 'gray'
  }
];

const RECENT_ACTIVITIES = [
  {
    type: 'user',
    title: 'New user registration',
    description: 'Dr. Sarah Johnson joined as researcher',
    time: '2 minutes ago',
    icon: Users,
    color: 'green'
  },
  {
    type: 'blog',
    title: 'Blog post published',
    description: 'Butterfly Migration Patterns in Southeast Asia',
    time: '1 hour ago',
    icon: BookOpen,
    color: 'gray'
  },
  {
    type: 'event',
    title: 'Event registered',
    description: 'Field expedition to Western Ghats',
    time: '3 hours ago',
    icon: Calendar,
    color: 'green'
  },
  {
    type: 'email',
    title: 'Newsletter sent',
    description: 'Monthly research updates to 2,847 subscribers',
    time: '6 hours ago',
    icon: Mail,
    color: 'gray'
  }
];

const QUICK_ACTIONS = [
  {
    title: 'Create New Blog',
    description: 'Publish research articles',
    icon: BookOpen,
    href: '/admin/blogs/create',
    color: 'green'
  },
  {
    title: 'Schedule Event',
    description: 'Plan field expeditions',
    icon: Calendar,
    href: '/admin/events/create',
    color: 'gray'
  },
  {
    title: 'Manage Users',
    description: 'User administration',
    icon: Users,
    href: '/admin/users',
    color: 'green'
  },
  {
    title: 'Send Newsletter',
    description: 'Email notifications',
    icon: Mail,
    href: '/admin/notifications',
    color: 'gray'
  }
];

const AdminDashboardPage = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-2 sm:space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Welcome back! Here's what's happening at Entomon Institute today.
            </p>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full"></span>
            </Button>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="rounded-2xl bg-gradient-to-r from-green-50 via-white to-gray-50 border border-green-100 p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Institute Overview</h3>
              <p className="text-sm text-gray-600">Track your platform's growth and engagement metrics.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-bold text-green-600">+18.2%</div>
                <div className="text-xs text-gray-500">Growth this month</div>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {STATS_CARDS.map((stat, index) => (
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
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
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

      <div className="grid grid-cols-1 gap-6 lg:gap-8 xl:grid-cols-3">
        {/* Recent Activity */}
        <Card className="xl:col-span-2 border border-gray-200">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold text-gray-900">Recent Activity</CardTitle>
                <CardDescription>Latest updates from across the platform</CardDescription>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 w-fit">
                <Activity className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {RECENT_ACTIVITIES.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-xl ${
                  activity.color === 'green' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <activity.icon className={`h-4 w-4 ${
                    activity.color === 'green' ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 break-words">{activity.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {QUICK_ACTIONS.map((action, index) => (
              <button
                key={index}
                className={`group w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  action.color === 'green'
                    ? 'border-green-200 hover:border-green-300 hover:bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${
                  action.color === 'green'
                    ? 'bg-green-100 group-hover:bg-green-200'
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <action.icon className={`h-4 w-4 ${
                    action.color === 'green' ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">{action.description}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-green-500 transition-colors flex-shrink-0" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-2">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Content Performance
            </CardTitle>
            <CardDescription>Blog posts and course engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-50 to-gray-50 border border-green-100">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-gray-900">Total Views</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-green-600">24,567</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-green-50 border border-gray-100">
                <div className="flex items-center gap-3">
                  <MousePointer className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Engagement Rate</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">68.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
              <PieChart className="h-5 w-5 text-green-600" />
              User Demographics
            </CardTitle>
            <CardDescription>Distribution of registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Students</span>
                  <span className="text-sm font-bold text-gray-900">65%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600 rounded-full transition-all duration-1000" style={{ width: '65%' }} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Researchers</span>
                  <span className="text-sm font-bold text-gray-900">25%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-600 rounded-full transition-all duration-1000" style={{ width: '25%' }} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Educators</span>
                  <span className="text-sm font-bold text-gray-900">10%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full transition-all duration-1000" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
