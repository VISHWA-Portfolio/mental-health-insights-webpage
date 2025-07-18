import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  Download, 
  BarChart3, 
  Settings2, 
  Zap, 
  Database,
  FileText,
  TrendingUp,
  Code,
  Play
} from "lucide-react";

interface DataColumn {
  name: string;
  type: 'numerical' | 'categorical' | 'text';
  nullCount: number;
  uniqueCount: number;
}

const FeatureEngineeringTools = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dataColumns, setDataColumns] = useState<DataColumn[]>([
    { name: 'Age', type: 'numerical', nullCount: 0, uniqueCount: 45 },
    { name: 'Gender', type: 'categorical', nullCount: 2, uniqueCount: 2 },
    { name: 'City', type: 'categorical', nullCount: 0, uniqueCount: 12 },
    { name: 'Profession', type: 'categorical', nullCount: 1, uniqueCount: 8 },
    { name: 'Sleep Duration', type: 'categorical', nullCount: 0, uniqueCount: 4 },
    { name: 'Dietary Habits', type: 'categorical', nullCount: 0, uniqueCount: 3 },
    { name: 'Depression', type: 'categorical', nullCount: 0, uniqueCount: 2 }
  ]);

  const [encodingMethods, setEncodingMethods] = useState<Record<string, string>>({});
  const [scalingMethods, setScalingMethods] = useState<Record<string, string>>({});

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'numerical': return 'bg-data-blue';
      case 'categorical': return 'bg-data-green';
      case 'text': return 'bg-data-orange';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-data bg-clip-text text-transparent">
          Feature Engineering Studio
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transform your raw data into powerful features for machine learning. 
          Upload, preprocess, encode, scale, and visualize your data with professional tools.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* File Upload Section */}
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Data Upload
            </CardTitle>
            <CardDescription>
              Upload your CSV file to begin feature engineering
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  {selectedFile ? selectedFile.name : "Drop your CSV file here or click to upload"}
                </p>
                <p className="text-muted-foreground">
                  Supports CSV files up to 100MB
                </p>
              </label>
            </div>
            {selectedFile && (
              <div className="mt-4 p-4 bg-accent/20 rounded-lg">
                <p className="text-sm text-accent-foreground">
                  ✓ File loaded: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Feature Engineering Tools */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="encoding" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Encoding
            </TabsTrigger>
            <TabsTrigger value="scaling" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Scaling
            </TabsTrigger>
            <TabsTrigger value="visualization" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Visualization
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>

          {/* Data Overview */}
          <TabsContent value="overview">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Data Overview</CardTitle>
                <CardDescription>
                  Summary of your dataset structure and column information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-data-blue/10 border-data-blue/20">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-data-blue">1,000</div>
                        <div className="text-sm text-muted-foreground">Total Rows</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-data-green/10 border-data-green/20">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-data-green">{dataColumns.length}</div>
                        <div className="text-sm text-muted-foreground">Columns</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-data-orange/10 border-data-orange/20">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-data-orange">
                          {dataColumns.reduce((sum, col) => sum + col.nullCount, 0)}
                        </div>
                        <div className="text-sm text-muted-foreground">Missing Values</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Column Information</h3>
                    <div className="space-y-3">
                      {dataColumns.map((column, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge className={`${getTypeColor(column.type)} text-white`}>
                              {column.type}
                            </Badge>
                            <span className="font-medium">{column.name}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Unique: {column.uniqueCount}</span>
                            <span>Null: {column.nullCount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Encoding */}
          <TabsContent value="encoding">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Data Encoding</CardTitle>
                <CardDescription>
                  Transform categorical variables into numerical representations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Label Encoder</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Convert categorical text to integers (0, 1, 2, ...)
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Apply to Selected
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-accent/5 border-accent/20">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">One-Hot Encoder</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Create binary columns for each category
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Apply to Selected
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-data-green/5 border-data-green/20">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Target Encoder</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Encode based on target variable statistics
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Apply to Selected
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Categorical Columns</h3>
                    <div className="space-y-3">
                      {dataColumns.filter(col => col.type === 'categorical').map((column, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-data-green text-white">categorical</Badge>
                            <span className="font-medium">{column.name}</span>
                            <span className="text-sm text-muted-foreground">({column.uniqueCount} unique values)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="gradient" size="sm">
                              <Zap className="h-4 w-4 mr-1" />
                              Label Encode
                            </Button>
                            <Button variant="outline" size="sm">
                              One-Hot
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scaling */}
          <TabsContent value="scaling">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Feature Scaling</CardTitle>
                <CardDescription>
                  Normalize numerical features for better model performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="bg-data-blue/5 border-data-blue/20">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Standard Scaler</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Mean = 0, Standard Deviation = 1
                        </p>
                        <Button variant="data" size="sm" className="w-full">
                          Apply Standard
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-data-purple/5 border-data-purple/20">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Min-Max Scaler</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Scale to range [0, 1]
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Apply Min-Max
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-data-orange/5 border-data-orange/20">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Robust Scaler</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Uses median and IQR (outlier resistant)
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Apply Robust
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Numerical Columns</h3>
                    <div className="space-y-3">
                      {dataColumns.filter(col => col.type === 'numerical').map((column, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-data-blue text-white">numerical</Badge>
                            <span className="font-medium">{column.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="data" size="sm">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              Standard Scale
                            </Button>
                            <Button variant="outline" size="sm">
                              Min-Max
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visualization */}
          <TabsContent value="visualization">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Data Visualization</CardTitle>
                <CardDescription>
                  Explore your data with interactive charts and plots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-data-blue/10 to-data-purple/10 border-data-blue/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Age Distribution</h3>
                      <div className="h-48 bg-card/50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 mx-auto mb-2 text-data-blue" />
                          <p className="text-sm text-muted-foreground">Histogram Plot</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <Play className="h-4 w-4 mr-2" />
                        Generate Plot
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-data-green/10 to-data-orange/10 border-data-green/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Dietary Habits</h3>
                      <div className="h-48 bg-card/50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-data-green/20 flex items-center justify-center mx-auto mb-2">
                            <span className="text-2xl">🥗</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Pie Chart</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <Play className="h-4 w-4 mr-2" />
                        Generate Plot
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <h4 className="font-semibold text-accent-foreground mb-2">📊 Visualization Insights</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Age distribution shows normal distribution with mean ~25 years</li>
                    <li>• Dietary habits: 45% Healthy, 35% Moderate, 20% Unhealthy</li>
                    <li>• Depression correlation with sleep duration: 0.73</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export */}
          <TabsContent value="export">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Export Processed Data</CardTitle>
                <CardDescription>
                  Download your feature-engineered dataset
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-6">
                        <FileText className="h-8 w-8 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">Processed CSV</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Download the cleaned and processed dataset
                        </p>
                        <Button variant="gradient" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download CSV
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-accent/5 border-accent/20">
                      <CardContent className="p-6">
                        <Code className="h-8 w-8 text-accent mb-3" />
                        <h3 className="font-semibold mb-2">Python Code</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Get the preprocessing pipeline code
                        </p>
                        <Button variant="accent" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download Code
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h4 className="font-semibold mb-3">Applied Transformations Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Label Encoding:</span>
                        <span className="text-muted-foreground">Gender, City, Profession, Sleep Duration, Dietary Habits</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Standard Scaling:</span>
                        <span className="text-muted-foreground">Age</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Missing Values:</span>
                        <span className="text-muted-foreground">3 values imputed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FeatureEngineeringTools;