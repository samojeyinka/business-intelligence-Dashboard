import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Upload, Info, AlertTriangle } from 'lucide-react';
import { VentureStage } from '@/types/venture';
import Header from '@/components/Header';
import InteractiveBackground from '@/components/InteractiveBackground';

// Form schema using zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Venture name must be at least 2 characters' }).max(100),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }).max(300),
  longDescription: z.string().optional(),
  stage: z.enum(['IDEA', 'PROTOTYPE', 'MVP', 'GROWTH', 'SCALE']),
  isStealthMode: z.boolean().default(false),
  isLookingForCollaborators: z.boolean().default(false),
  sectors: z.array(z.string()).min(1, { message: 'Select at least one sector' }),
  technologies: z.array(z.string()).optional(),
  website: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
  twitter: z.string().optional(),
  linkedin: z.string().url({ message: 'Please enter a valid LinkedIn URL' }).optional().or(z.literal('')),
  github: z.string().optional(),
  teamSize: z.number().min(1).default(1),
  foundedDate: z.string().optional(),
  logo: z.any().optional(),
  termsAccepted: z.boolean().refine(val => val === true, { message: 'You must accept the terms' }),
});

type FormValues = z.infer<typeof formSchema>;

const SubmitVenturePage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      longDescription: '',
      stage: 'IDEA',
      isStealthMode: false,
      isLookingForCollaborators: false,
      sectors: [],
      technologies: [],
      website: '',
      twitter: '',
      linkedin: '',
      github: '',
      teamSize: 1,
      foundedDate: '',
      termsAccepted: false,
    },
  });

  // Handle logo upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a storage service
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send this data to your API
      console.log('Submitting venture:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to success page or ventures list
      router.push('/ventures/submit/success');
    } catch (error) {
      console.error('Error submitting venture:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Available sectors
  const sectors = [
    'AI & Machine Learning',
    'Blockchain',
    'Climate Tech',
    'E-commerce',
    'EdTech',
    'FinTech',
    'Healthcare',
    'SaaS',
    'Social Impact',
  ];

  // Available technologies
  const technologies = [
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'TensorFlow',
    'Blockchain',
    'Solidity',
    'AWS',
    'Docker',
    'Kubernetes',
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <InteractiveBackground />
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="relative z-10 max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 text-zinc-400 hover:text-white"
            onClick={() => router.push('/ventures')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Ventures
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-800">
                <h1 className="text-2xl font-bold text-white">Submit Your Venture</h1>
                <p className="mt-2 text-zinc-400">
                  Showcase your venture to the Coact community and connect with potential collaborators, investors, and users.
                </p>
              </div>
              
              <div className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-white">Basic Information</h2>
                      
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Venture Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your venture name" 
                                className="bg-zinc-800/50 border-zinc-700 focus:border-purple-500"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Briefly describe your venture (max 300 characters)" 
                                className="bg-zinc-800/50 border-zinc-700 focus:border-purple-500"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              This will appear in venture cards and search results.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="longDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Detailed Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Provide a comprehensive description of your venture" 
                                className="min-h-32 bg-zinc-800/50 border-zinc-700 focus:border-purple-500"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              This will appear on your venture's detail page.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="stage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Venture Stage</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-zinc-800/50 border-zinc-700">
                                    <SelectValue placeholder="Select stage" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="IDEA">Idea</SelectItem>
                                  <SelectItem value="PROTOTYPE">Prototype</SelectItem>
                                  <SelectItem value="MVP">MVP</SelectItem>
                                  <SelectItem value="GROWTH">Growth</SelectItem>
                                  <SelectItem value="SCALE">Scale</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="teamSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Team Size</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="1"
                                  className="bg-zinc-800/50 border-zinc-700 focus:border-purple-500"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="isStealthMode"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-800 p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Stealth Mode
                                </FormLabel>
                                <FormDescription>
                                  Hide sensitive details about your venture
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="isLookingForCollaborators"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-800 p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Looking for Collaborators
                                </FormLabel>
                                <FormDescription>
                                  Indicate that you're open to new team members
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator className="bg-zinc-800" />
                    
                    {/* Categories and Technologies */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-white">Categories & Technologies</h2>
                      
                      <FormField
                        control={form.control}
                        name="sectors"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sectors</FormLabel>
                            <FormDescription>
                              Select the sectors that best describe your venture.
                            </FormDescription>
                            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                              {sectors.map((sector) => (
                                <FormItem
                                  key={sector}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(sector)}
                                      onCheckedChange={(checked) => {
                                        const updatedSectors = checked
                                          ? [...field.value, sector]
                                          : field.value?.filter((s) => s !== sector);
                                        field.onChange(updatedSectors);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {sector}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="technologies"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Technologies</FormLabel>
                            <FormDescription>
                              Select the technologies your venture uses.
                            </FormDescription>
                            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                              {technologies.map((tech) => (
                                <FormItem
                                  key={tech}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(tech)}
                                      onCheckedChange={(checked) => {
                                        const updatedTech = checked
                                          ? [...(field.value || []), tech]
                                          : (field.value || []).filter((t) => t !== tech);
                                        field.onChange(updatedTech);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {tech}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator className="bg-zinc-800" />
                    
                    {/* Links and Media */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-white">Links & Media</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="https://yourventure.com" 
                                  className="bg-zinc-800/50 border-zinc-700 focus:border-purple-500"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="twitter"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Twitter/X Handle</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="@yourventure" 
                                  className="bg-zinc-800/50 border-zinc-700 focus:border-purple-500"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="linkedin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>LinkedIn</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="https://linkedin.com/company/yourventure" 
                                  className="bg-zinc-800/50 border-zinc-700 focus:border-purple-500"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="github"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>GitHub</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="yourventure" 
                                  className="bg-zinc-800/50 border-zinc-700 focus:border-purple-500"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="foundedDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Founded Date</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                className="bg-zinc-800/50 border-zinc-700 focus:border-purple-500"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-2">
                        <FormLabel>Logo</FormLabel>
                        <div className="flex items-center space-x-4">
                          {logoPreview ? (
                            <div className="relative h-20 w-20 overflow-hidden rounded-md bg-zinc-800">
                              <img 
                                src={logoPreview} 
                                alt="Logo preview" 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-md bg-zinc-800 text-zinc-500">
                              <Upload className="h-8 w-8" />
                            </div>
                          )}
                          <div className="flex-1">
                            <Input
                              type="file"
                              accept="image/*"
                              className="bg-zinc-800/50 border-zinc-700 focus:border-purple-500"
                              onChange={handleLogoChange}
                            />
                            <p className="mt-1 text-xs text-zinc-500">
                              Recommended: Square image, at least 200x200px
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="bg-zinc-800" />
                    
                    {/* Terms and Submission */}
                    <div className="space-y-4">
                      <div className="rounded-md border border-amber-500/20 bg-amber-950/20 p-4">
                        <div className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-medium text-amber-500">Important Information</h3>
                            <div className="mt-1 text-sm text-amber-200/70">
                              <p>All submissions are reviewed by our team before being published. This process typically takes 1-2 business days.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I agree to the terms and conditions
                              </FormLabel>
                              <FormDescription>
                                By submitting, you confirm that you have the right to share this information and agree to our <a href="#" className="text-purple-400 hover:underline">Terms of Service</a>.
                              </FormDescription>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          className="bg-purple-600 hover:bg-purple-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Venture'}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SubmitVenturePage;