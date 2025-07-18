import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Clock,
  BookOpen,
  Home,
  Briefcase,
  Moon
} from "lucide-react";

const Index = () => {
  const stats = [
    { label: "Students Surveyed", value: "1,000", icon: Users, color: "data-blue" },
    { label: "Depression Rate", value: "32%", icon: Brain, color: "data-red" },
    { label: "High Risk Factors", value: "7", icon: TrendingUp, color: "data-orange" },
    { label: "Analysis Complete", value: "100%", icon: Clock, color: "data-green" }
  ];

  const riskFactors = [
    { factor: "Academic Pressure", impact: "High", percentage: "78%" },
    { factor: "Sleep Duration", impact: "High", percentage: "73%" },
    { factor: "Financial Stress", impact: "Medium", percentage: "65%" },
    { factor: "Social Isolation", impact: "Medium", percentage: "58%" },
    { factor: "Family History", impact: "Low", percentage: "34%" },
    { factor: "Dietary Habits", impact: "Low", percentage: "29%" }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-data-red text-white";
      case "Medium": return "bg-data-orange text-white";
      case "Low": return "bg-data-green text-white";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-data bg-clip-text text-transparent">
          Student Depression Analysis
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Comprehensive analysis of depression factors among university students. 
          Understanding mental health patterns to improve student well-being and academic success.
        </p>
      </div>

      {/* Statistics Overview */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 text-${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Findings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Risk Factors */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Depression Risk Factors
              </CardTitle>
              <CardDescription>
                Factors contributing to student depression ranked by impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{item.factor}</span>
                      <Badge className={getImpactColor(item.impact)}>
                        {item.impact}
                      </Badge>
                    </div>
                    <span className="text-sm font-semibold text-primary">{item.percentage}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Insights */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Key Insights
              </CardTitle>
              <CardDescription>
                Critical findings from the depression analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-data-red/10 border border-data-red/20 rounded-lg">
                  <h4 className="font-semibold text-data-red mb-2">🚨 High Alert</h4>
                  <p className="text-sm">Students with poor sleep patterns show 73% correlation with depression symptoms</p>
                </div>
                
                <div className="p-4 bg-data-orange/10 border border-data-orange/20 rounded-lg">
                  <h4 className="font-semibold text-data-orange mb-2">⚠️ Moderate Risk</h4>
                  <p className="text-sm">Financial stress affects 65% of students and significantly impacts mental health</p>
                </div>
                
                <div className="p-4 bg-data-green/10 border border-data-green/20 rounded-lg">
                  <h4 className="font-semibold text-data-green mb-2">✅ Positive Finding</h4>
                  <p className="text-sm">Students with regular exercise routines show 45% lower depression rates</p>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">📊 Statistical Significance</h4>
                  <p className="text-sm">Model achieved 89% accuracy in predicting depression risk factors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Demographic Breakdown */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-data-blue" />
              Demographic Analysis
            </CardTitle>
            <CardDescription>
              Depression patterns across different student demographics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-data-blue/10 to-data-purple/10 rounded-lg border border-data-blue/20">
                <BookOpen className="h-8 w-8 text-data-blue mx-auto mb-3" />
                <h3 className="font-semibold mb-2">By Academic Year</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Freshman:</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sophomore:</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Junior:</span>
                    <span className="font-medium">38%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Senior:</span>
                    <span className="font-medium">31%</span>
                  </div>
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-data-green/10 to-data-orange/10 rounded-lg border border-data-green/20">
                <Home className="h-8 w-8 text-data-green mx-auto mb-3" />
                <h3 className="font-semibold mb-2">By Living Situation</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Dorm:</span>
                    <span className="font-medium">29%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Off-campus:</span>
                    <span className="font-medium">34%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>With Family:</span>
                    <span className="font-medium">26%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alone:</span>
                    <span className="font-medium">42%</span>
                  </div>
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-data-purple/10 to-data-red/10 rounded-lg border border-data-purple/20">
                <Briefcase className="h-8 w-8 text-data-purple mx-auto mb-3" />
                <h3 className="font-semibold mb-2">By Employment</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Full-time Student:</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Part-time Job:</span>
                    <span className="font-medium">36%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Full-time Job:</span>
                    <span className="font-medium">41%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unemployed:</span>
                    <span className="font-medium">38%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-accent" />
              Recommendations
            </CardTitle>
            <CardDescription>
              Evidence-based interventions to reduce student depression
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">For Institutions:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Implement mandatory sleep hygiene workshops for all students</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Expand financial aid and emergency assistance programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Create peer support networks and mentorship programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Increase counseling center staffing and accessibility</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">For Students:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Maintain consistent sleep schedule (7-9 hours nightly)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Engage in regular physical activity and outdoor time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Build social connections through clubs and activities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Seek professional help when experiencing symptoms</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gradient" className="flex-1">
                  View Full Research Report
                </Button>
                <Button variant="outline" className="flex-1">
                  Download Dataset
                </Button>
                <Button variant="accent" className="flex-1">
                  Contact Researchers
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
