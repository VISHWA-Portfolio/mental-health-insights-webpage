import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Database,
  Settings,
  BarChart3,
  TrendingUp,
  Play,
  CheckCircle,
  AlertCircle,
  FileText,
  Code2
} from "lucide-react";

interface ColumnData {
  name: string;
  type: 'categorical' | 'numerical';
  sampleValues: string[];
  encoded?: boolean;
  scaled?: boolean;
}

const DataAnalysisWorkflow = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const [columns, setColumns] = useState<ColumnData[]>([
    { name: 'Gender', type: 'categorical', sampleValues: ['Male', 'Female'], encoded: false },
    { name: 'Age', type: 'numerical', sampleValues: ['18', '19', '20', '21', '22'], encoded: false },
    { name: 'City', type: 'categorical', sampleValues: ['New York', 'Los Angeles', 'Chicago'], encoded: false },
    { name: 'Profession', type: 'categorical', sampleValues: ['Student', 'Engineer', 'Teacher'], encoded: false },
    { name: 'Sleep Duration', type: 'categorical', sampleValues: ['Less than 5 hours', '5-6 hours', '7-8 hours', 'More than 8 hours'], encoded: false },
    { name: 'Dietary Habits', type: 'categorical', sampleValues: ['Healthy', 'Moderate', 'Unhealthy'], encoded: false },
    { name: 'Degree', type: 'categorical', sampleValues: ['Bachelor', 'Master', 'PhD'], encoded: false },
    { name: 'Have you ever had suicidal thoughts ?', type: 'categorical', sampleValues: ['Yes', 'No'], encoded: false },
    { name: 'Financial Stress', type: 'categorical', sampleValues: ['Low', 'Medium', 'High'], encoded: false },
    { name: 'Family History of Mental Illness', type: 'categorical', sampleValues: ['Yes', 'No'], encoded: false },
    { name: 'Depression', type: 'categorical', sampleValues: ['Yes', 'No'], encoded: false }
  ]);

  const runLabelEncoding = () => {
    setProgress(20);
    setTimeout(() => {
      const updatedColumns = columns.map(col => 
        col.type === 'categorical' ? { ...col, encoded: true } : col
      );
      setColumns(updatedColumns);
      setStep(2);
      setProgress(40);
    }, 1500);
  };

  const runStandardScaling = () => {
    setProgress(60);
    setTimeout(() => {
      const updatedColumns = columns.map(col => 
        col.type === 'numerical' ? { ...col, scaled: true } : col
      );
      setColumns(updatedColumns);
      setStep(3);
      setProgress(80);
    }, 1500);
  };

  const runModelTraining = () => {
    setProgress(90);
    setTimeout(() => {
      setAnalysisResults({
        accuracy: 0.8742,
        f1Score: 0.8156,
        trainSize: 800,
        testSize: 200,
        predictions: [0, 1, 0, 1, 0, 1, 1, 0, 1, 0]
      });
      setStep(4);
      setProgress(100);
    }, 2000);
  };

  const resetAnalysis = () => {
    setStep(1);
    setProgress(0);
    setAnalysisResults(null);
    const resetColumns = columns.map(col => ({
      ...col,
      encoded: false,
      scaled: false
    }));
    setColumns(resetColumns);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-data bg-clip-text text-transparent">
          Student Depression Data Analysis
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Follow the complete machine learning pipeline: from data preprocessing to model evaluation
        </p>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Analysis Progress</h3>
              <span className="text-sm text-muted-foreground">{progress}% Complete</span>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="flex items-center justify-between text-sm">
              <span className={step >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>
                Data Loading
              </span>
              <span className={step >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>
                Label Encoding
              </span>
              <span className={step >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>
                Feature Scaling
              </span>
              <span className={step >= 4 ? "text-primary font-medium" : "text-muted-foreground"}>
                Model Training
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="data" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Data Overview
            </TabsTrigger>
            <TabsTrigger value="preprocessing" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Preprocessing
            </TabsTrigger>
            <TabsTrigger value="visualization" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Visualization
            </TabsTrigger>
            <TabsTrigger value="modeling" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              ML Model
            </TabsTrigger>
          </TabsList>

          {/* Data Overview Tab */}
          <TabsContent value="data">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Dataset Overview</CardTitle>
                <CardDescription>
                  Student depression dataset with {columns.length} columns and 1,000 rows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="p-4 bg-code/5 border border-code/20 rounded-lg">
                    <code className="text-sm">
                      df = pd.read_csv("/content/student_depression_dataset.csv")<br/>
                      df.info()
                    </code>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Column Information</h4>
                    <div className="grid gap-3">
                      {columns.map((column, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge className={column.type === 'categorical' ? 'bg-data-green text-white' : 'bg-data-blue text-white'}>
                              {column.type}
                            </Badge>
                            <span className="font-medium">{column.name}</span>
                            <div className="flex items-center gap-1">
                              {column.encoded && <CheckCircle className="h-4 w-4 text-data-green" />}
                              {column.scaled && <CheckCircle className="h-4 w-4 text-data-blue" />}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Sample: {column.sampleValues.slice(0, 3).join(', ')}
                            {column.sampleValues.length > 3 && '...'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preprocessing Tab */}
          <TabsContent value="preprocessing">
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>1. Label Encoding</CardTitle>
                  <CardDescription>
                    Convert categorical variables to numerical format using LabelEncoder
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-code/5 border border-code/20 rounded-lg">
                      <code className="text-sm whitespace-pre-wrap">
{`from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['Gender'] = le.fit_transform(df['Gender'])
df['City'] = le.fit_transform(df['City'])
df['Profession'] = le.fit_transform(df['Profession'])
# ... (applying to all categorical columns)`}
                      </code>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button 
                        onClick={runLabelEncoding} 
                        disabled={step > 1}
                        variant={step > 1 ? "outline" : "gradient"}
                        className="flex items-center gap-2"
                      >
                        {step > 1 ? <CheckCircle className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {step > 1 ? "Label Encoding Complete" : "Run Label Encoding"}
                      </Button>
                      {step > 1 && (
                        <span className="text-sm text-data-green">
                          ✓ {columns.filter(c => c.type === 'categorical').length} categorical columns encoded
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>2. Feature Scaling</CardTitle>
                  <CardDescription>
                    Standardize numerical features using StandardScaler
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-code/5 border border-code/20 rounded-lg">
                      <code className="text-sm whitespace-pre-wrap">
{`from sklearn.preprocessing import StandardScaler
st = StandardScaler()
X = df.drop(['Depression'], axis=1)
y = df['Depression']
X_scaled = st.fit_transform(X)`}
                      </code>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button 
                        onClick={runStandardScaling} 
                        disabled={step < 2 || step > 2}
                        variant={step > 2 ? "outline" : step === 2 ? "gradient" : "secondary"}
                        className="flex items-center gap-2"
                      >
                        {step > 2 ? <CheckCircle className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {step > 2 ? "Feature Scaling Complete" : "Run Feature Scaling"}
                      </Button>
                      {step > 2 && (
                        <span className="text-sm text-data-blue">
                          ✓ {columns.filter(c => c.type === 'numerical').length} numerical features scaled
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Visualization Tab */}
          <TabsContent value="visualization">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                  <CardDescription>Histogram with KDE for age distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-code/5 border border-code/20 rounded-lg">
                      <code className="text-sm">
                        plt.figure(figsize=(13, 7))<br/>
                        sns.histplot(df['Age'].dropna(), bins=30, kde=True, color='red')<br/>
                        plt.title('Age Distribution')<br/>
                        plt.show()
                      </code>
                    </div>
                    
                    <div className="h-48 bg-gradient-to-br from-data-red/10 to-data-orange/10 rounded-lg flex items-center justify-center border border-data-red/20">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 text-data-red" />
                        <p className="text-sm text-muted-foreground">Age Histogram Visualization</p>
                        <p className="text-xs text-muted-foreground mt-1">Mean age: 21.3 years</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Dietary Habits Distribution</CardTitle>
                  <CardDescription>Pie chart showing dietary habits breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-code/5 border border-code/20 rounded-lg">
                      <code className="text-sm">
                        Dietary_Habits = df['Dietary Habits'].value_counts()<br/>
                        plt.pie(Dietary_Habits, autopct='%1.1f%%')<br/>
                        plt.title('Dietary Habits')<br/>
                        plt.show()
                      </code>
                    </div>
                    
                    <div className="h-48 bg-gradient-to-br from-data-green/10 to-data-blue/10 rounded-lg flex items-center justify-center border border-data-green/20">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-data-green/20 flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl">🥗</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Dietary Habits Pie Chart</p>
                        <div className="text-xs text-muted-foreground mt-1 space-y-1">
                          <div>Healthy: 45%</div>
                          <div>Moderate: 35%</div>
                          <div>Unhealthy: 20%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ML Model Tab */}
          <TabsContent value="modeling">
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Logistic Regression Model</CardTitle>
                  <CardDescription>
                    Train and evaluate a logistic regression model for depression prediction
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-code/5 border border-code/20 rounded-lg">
                      <code className="text-sm whitespace-pre-wrap">
{`from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LogisticRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)`}
                      </code>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button 
                        onClick={runModelTraining} 
                        disabled={step < 3 || step > 3}
                        variant={step > 3 ? "outline" : step === 3 ? "gradient" : "secondary"}
                        className="flex items-center gap-2"
                      >
                        {step > 3 ? <CheckCircle className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {step > 3 ? "Model Training Complete" : "Train Model"}
                      </Button>
                      {step > 3 && (
                        <span className="text-sm text-data-green">
                          ✓ Model trained successfully
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {analysisResults && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Model Results</CardTitle>
                    <CardDescription>Performance metrics and predictions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <Card className="bg-data-green/10 border-data-green/20">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-data-green">
                            {(analysisResults.accuracy * 100).toFixed(1)}%
                          </div>
                          <div className="text-sm text-muted-foreground">Accuracy Score</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-data-blue/10 border-data-blue/20">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-data-blue">
                            {analysisResults.f1Score.toFixed(3)}
                          </div>
                          <div className="text-sm text-muted-foreground">F1 Score</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-data-purple/10 border-data-purple/20">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-data-purple">
                            {analysisResults.trainSize}
                          </div>
                          <div className="text-sm text-muted-foreground">Training Samples</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-data-orange/10 border-data-orange/20">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-data-orange">
                            {analysisResults.testSize}
                          </div>
                          <div className="text-sm text-muted-foreground">Test Samples</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Sample Predictions</h4>
                      <div className="p-4 bg-card border border-border rounded-lg">
                        <code className="text-sm">
                          y_pred = {JSON.stringify(analysisResults.predictions)}
                        </code>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button variant="gradient" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Export Results
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Code2 className="h-4 w-4" />
                          View Full Code
                        </Button>
                        <Button variant="secondary" onClick={resetAnalysis} className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Reset Analysis
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataAnalysisWorkflow;