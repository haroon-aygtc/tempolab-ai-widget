import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Code,
  MessageSquare,
  Settings,
  Sparkles,
  Zap,
  BarChart3,
  Users,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "conversation",
      title: "New conversation started",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "widget",
      title: "Widget settings updated",
      time: "1 hour ago",
      status: "success",
    },
    {
      id: 3,
      type: "provider",
      title: "API key updated for Mistral",
      time: "3 hours ago",
      status: "success",
    },
    {
      id: 4,
      type: "conversation",
      title: "Response time alert",
      time: "5 hours ago",
      status: "warning",
    },
    {
      id: 5,
      type: "widget",
      title: "New widget created",
      time: "1 day ago",
      status: "success",
    },
  ];

  // Sample data for quick actions
  const quickActions = [
    {
      title: "Create Widget",
      icon: <PlusCircle className="h-5 w-5" />,
      path: "/widgets/new",
    },
    {
      title: "Configure AI",
      icon: <Sparkles className="h-5 w-5" />,
      path: "/ai-providers",
    },
    {
      title: "Get Embed Code",
      icon: <Code className="h-5 w-5" />,
      path: "/embed-code",
    },
    {
      title: "Widget Designer",
      icon: <Settings className="h-5 w-5" />,
      path: "/widget-designer",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">Welcome to ChatEmbed</h1>
            <p className="text-blue-100 mb-6">
              Your AI-powered chat widget platform. Create, customize, and
              deploy intelligent chat widgets to your website in minutes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                Create New Widget <PlusCircle className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-blue-600"
              >
                View Documentation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <DashboardOverview />

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Tabs Section */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="conversations">Conversations</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Widget Performance</CardTitle>
                    <CardDescription>
                      Overview of your widget performance across all websites
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">
                            Conversation Rate
                          </div>
                          <div className="text-sm text-muted-foreground">
                            68%
                          </div>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">
                            Response Accuracy
                          </div>
                          <div className="text-sm text-muted-foreground">
                            92%
                          </div>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">
                            User Satisfaction
                          </div>
                          <div className="text-sm text-muted-foreground">
                            87%
                          </div>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Provider Usage</CardTitle>
                    <CardDescription>
                      Distribution of AI provider usage across your widgets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                          <span>Google Gemini</span>
                        </div>
                        <Badge>45%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                          <span>Mistral</span>
                        </div>
                        <Badge>30%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span>OpenRouter</span>
                        </div>
                        <Badge>15%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                          <span>Hugging Face</span>
                        </div>
                        <Badge>10%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conversations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Conversations</CardTitle>
                    <CardDescription>
                      View and analyze recent conversations from your chat
                      widgets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* If you have conversations, show them here */}
                      <div className="text-center py-12 text-muted-foreground">
                        No conversations yet. Deploy your widget to start
                        collecting data.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>
                      Analytics and performance data for your chat widgets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* If you have performance data, show it here */}
                      <div className="text-center py-12 text-muted-foreground">
                        No performance data yet. Deploy your widget to start
                        collecting metrics.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks you might want to perform
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 divide-y">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="justify-start h-auto py-3 px-4"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {action.icon}
                        </div>
                        <div className="flex-grow text-left">
                          <div className="font-medium">{action.title}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions and events</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[280px]">
                  <div className="grid grid-cols-1 divide-y">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {activity.status === "success" ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-amber-500" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium">{activity.title}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="ghost" className="w-full justify-center">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
