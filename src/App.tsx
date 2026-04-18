/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, type ReactNode } from "react";
import { 
  Search, 
  Menu, 
  Sun, 
  Moon, 
  ArrowRight, 
  Layout, 
  Image as ImageIcon, 
  Share2, 
  PlayCircle, 
  Monitor, 
  Smartphone, 
  Clock, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Star,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  X,
  MessageCircle,
  Send,
  Bot,
  Sparkles,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";

// --- Data ---

const CATEGORIES = [
  {
    title: "Pinterest Marketing",
    description: "Drive traffic with visual SEO",
    image: "https://picsum.photos/seed/pinterest/400/300",
    color: "bg-red-50 text-red-600",
    icon: <Search className="w-5 h-5" />
  },
  {
    title: "Facebook Marketing",
    description: "Build audience and convert with content",
    image: "https://picsum.photos/seed/facebook/400/300",
    color: "bg-blue-50 text-blue-600",
    icon: <Facebook className="w-5 h-5" />
  },
  {
    title: "Instagram Marketing",
    description: "Grow fast with short form content",
    image: "https://picsum.photos/seed/instagram/400/300",
    color: "bg-pink-50 text-pink-600",
    icon: <Instagram className="w-5 h-5" />
  },
  {
    title: "Beginner Guides",
    description: "Start from zero step by step",
    image: "https://picsum.photos/seed/guide/400/300",
    color: "bg-emerald-50 text-emerald-600",
    icon: <Layout className="w-5 h-5" />
  }
];

const BLOG_POSTS = [
  {
    id: 1,
    image: "https://picsum.photos/seed/blog1/600/400",
    category: "Pinterest",
    title: "How to Do Affiliate Marketing on Pinterest (Step by Step)",
    preview: "Pinterest is a visual search platform with massive buying intent. Learn how to structure your pins for consistent sales.",
    readTime: "5 min read",
    content: `
      <h2>Introduction</h2>
      <p>Pinterest is a visual search platform. Users come with buying intent. That makes it strong for affiliate marketing if you use the right structure.</p>
      <img src="https://picsum.photos/seed/pinterest-intro/800/600" alt="Pinterest Marketing Overview" referrerPolicy="no-referrer" />

      <h2>Step 1: Create a Pinterest Business Account</h2>
      <ul>
        <li>Sign up or convert to business account</li>
        <li>Add profile photo and keyword-based bio</li>
        <li>Add your niche clearly <em>(Example: “Helping beginners earn with affiliate marketing”)</em></li>
      </ul>

      <h2>Step 2: Choose a Profitable Niche</h2>
      <p>Focus on one niche only. Good options include Health and fitness, Make money online, Beauty and skincare, or Tech and gadgets. Pick a niche with products people already buy.</p>
      <img src="https://picsum.photos/seed/niche/800/600" alt="Profitable Niche Selection" referrerPolicy="no-referrer" />

      <h2>Step 3: Join Affiliate Programs</h2>
      <p>Use trusted platforms like Amazon Associates, ClickBank, or Digistore24. Choose products with good reviews, high demand, and clear landing pages.</p>

      <h2>Step 4: Create High-Quality Pins</h2>
      <p>Your pin drives clicks. Use tools like Canva to create vertical pins (1000 x 1500). Ensure you have a clear headline, bright image, and a strong call to action.</p>
      <img src="https://picsum.photos/seed/pins/800/600" alt="High Quality Pinterest Pins" referrerPolicy="no-referrer" />

      <h2>Step 5: Add Affiliate Link Correctly</h2>
      <p>You can direct link in the pin URL, but the better method is sending traffic to a blog or landing page first. This builds trust and increases conversions.</p>

      <h2>Step 6: Use Keywords for SEO</h2>
      <p>Pinterest works like a search engine. Add keywords in your pin title, description, and board name.</p>

      <h2>Step 7: Post Consistently</h2>
      <p>Consistency drives growth. Post 5 to 10 pins daily and focus on quality and volume.</p>

      <h2>Step 8: Track Performance</h2>
      <p>Check clicks, saves, and conversions. Double down on pins that perform well.</p>

      <div class="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl my-8">
        <h3 class="font-bold text-blue-900 dark:text-blue-100 mb-2">Pro Tips</h3>
        <ul class="text-sm space-y-2">
          <li>Use multiple pin designs for one product</li>
          <li>Test different headlines</li>
          <li>Focus on problem solving content</li>
          <li>Avoid spammy designs</li>
          <li>Always disclose affiliate links</li>
        </ul>
      </div>

      <h2>Simple Strategy That Works</h2>
      <p>Pick one product, create 5 to 10 pins using different designs/keywords, and post daily for 30 days. Many beginners get their first sale within 2 to 4 weeks using this method.</p>

      <h2>Conclusion</h2>
      <p>Pinterest gives free traffic. Affiliate marketing converts that traffic into income. Focus on niche, consistency, and good pin design.</p>
      
      <div class="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h3 class="flex items-center gap-2 mb-4 text-brand-primary">
          <span class="p-1 px-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-xs font-bold uppercase tracking-widest">Video Guide</span>
          Watch the Full Tutorial
        </h3>
        <div class="aspect-video w-full bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 relative group cursor-pointer">
          <a href="https://www.youtube.com/watch?v=7z93uRbMzGI" target="_blank" rel="noopener noreferrer" class="absolute inset-0 z-10"></a>
          <img src="https://picsum.photos/seed/pin-video/800/450" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <PlayCircle className="w-8 h-8 ml-1" />
            </div>
          </div>
        </div>
        <p class="text-xs text-brand-muted mt-3 text-center">Reference: Pinterest Affiliate Marketing Complete Masterclass</p>
      </div>
    `
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/blog2/600/400",
    category: "Instagram",
    title: "How to Do Affiliate Marketing on Instagram (Step by Step)",
    preview: "Instagram is a content-driven platform. Build trust, create short-form content, and guide users to your links.",
    readTime: "8 min read",
    content: `
      <h2>Introduction</h2>
      <p>Instagram is a content-driven platform. People follow accounts they trust. You earn when you build attention and guide users to the right offers.</p>
      <img src="https://picsum.photos/seed/instagram-marketing/800/600" alt="Instagram Marketing Strategy" referrerPolicy="no-referrer" />

      <h2>Step 1: Create a Niche-Focused Account</h2>
      <ul>
        <li>Choose one niche only</li>
        <li>Use a clear username</li>
        <li>Add a bio with value and keywords <em>(Example: “Helping you earn online with simple methods”)</em></li>
      </ul>

      <h2>Step 2: Choose a Profitable Niche</h2>
      <p>Pick a niche with demand and products. Good options include Fitness, Skincare, Tech, or Make money online. Stay focused. Do not mix niches.</p>

      <h2>Step 3: Join Affiliate Programs</h2>
      <p>Use trusted platforms like Amazon Associates, ClickBank, or Digistore24. Choose products that solve a clear problem, have good reviews, and offer commission worth your effort.</p>
      <img src="https://picsum.photos/seed/affiliate-programs/800/600" alt="Affiliate Programs" referrerPolicy="no-referrer" />

      <h2>Step 4: Create Content That Attracts Attention</h2>
      <p>Content drives growth. Focus on Reels, Carousel posts, and Stories. Ideas include tips, tutorials, results, and product demos.</p>

      <h2>Step 5: Use Reels for Fast Growth</h2>
      <p>Reels get the most reach. Keep videos 7 to 15 seconds, use a strong hook in the first 2 seconds, add text on screen, and use trending audio.</p>
      <img src="https://picsum.photos/seed/reels/800/600" alt="Instagram Reels" referrerPolicy="no-referrer" />

      <h2>Step 6: Add Your Affiliate Link</h2>
      <p>Instagram does not allow clickable links in captions. Use a link in bio or tools like Linktree. The best method is sending traffic to a landing page first.</p>

      <h2>Step 7: Build Trust Before Selling</h2>
      <p>People buy from accounts they trust. Share real tips, show proof if possible, avoid spam posts, and post value more than promotions.</p>

      <h2>Step 8: Post Consistently</h2>
      <p>Consistency builds growth. Aim for 1 to 3 posts daily, at least 1 reel per day, and daily stories.</p>

      <h2>Step 9: Use Hashtags and Keywords</h2>
      <p>Use relevant hashtags like #affiliatemarketing, #makemoneyonline, or #passiveincome. Add keywords in captions to improve reach.</p>

      <h2>Step 10: Track What Works</h2>
      <p>Check views, likes, saves, and link clicks. Repeat what performs best.</p>

      <div class="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-xl my-8">
        <h3 class="font-bold text-purple-900 dark:text-purple-100 mb-2">Pro Tips</h3>
        <ul class="text-sm space-y-2">
          <li>Focus on one product at a time</li>
          <li>Create multiple videos for same offer</li>
          <li>Use clear call to action</li>
          <li>Reply to comments and messages</li>
          <li>Stay consistent for at least 30 days</li>
        </ul>
      </div>

      <h2>Simple Strategy That Works</h2>
      <p>Pick one product, create 10 reels around it, post daily, and drive traffic to bio link. Many beginners get first results within 2 to 3 weeks.</p>

      <h2>Conclusion</h2>
      <p>Instagram rewards consistency and value. Build trust, create short content, and guide users to your link. That is how affiliate marketing works on Instagram.</p>
      
      <div class="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h3 class="flex items-center gap-2 mb-4 text-brand-primary">
          <span class="p-1 px-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-xs font-bold uppercase tracking-widest">Video Guide</span>
          Watch the Full Tutorial
        </h3>
        <div class="aspect-video w-full bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 relative group cursor-pointer">
          <a href="https://www.youtube.com/watch?v=0UXuYZkgm2M" target="_blank" rel="noopener noreferrer" class="absolute inset-0 z-10"></a>
          <img src="https://picsum.photos/seed/insta-video/800/450" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <PlayCircle className="w-8 h-8 ml-1" />
            </div>
          </div>
        </div>
        <p class="text-xs text-brand-muted mt-3 text-center">Reference: Instagram Affiliate Marketing Complete Masterclass</p>
      </div>
    `
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/blog3/600/400",
    category: "Facebook",
    title: "How to Do Affiliate Marketing on Facebook (Step by Step)",
    preview: "Facebook gives access to large audiences. Learn how to use groups, pages, and storytelling to earn.",
    readTime: "7 min read",
    content: `
      <h2>Introduction</h2>
      <p>Facebook gives access to large audiences. You can use groups, pages, and content to drive traffic and earn commissions.</p>
      <img src="https://picsum.photos/seed/facebook-groups/800/600" alt="Facebook Community Marketing" referrerPolicy="no-referrer" />

      <h2>Step 1: Set Up Your Profile and Page</h2>
      <ul>
        <li>Optimize your personal profile</li>
        <li>Create a niche-specific page</li>
        <li>Add clear bio and profile image</li>
        <li>Show what value you provide <em>(Example: “Helping beginners earn online with simple methods”)</em></li>
      </ul>

      <h2>Step 2: Choose a Profitable Niche</h2>
      <p>Focus on one niche. Good options include Fitness, Online earning, Beauty, or Tech. Stay consistent with your niche.</p>

      <h2>Step 3: Join Affiliate Programs</h2>
      <p>Use platforms like Amazon Associates, ClickBank, or Digistore24. Pick products that solve a real problem, have demand, and offer good commission.</p>
      <img src="https://picsum.photos/seed/facebook-ads/800/600" alt="Facebook Marketing Growth" referrerPolicy="no-referrer" />

      <h2>Step 4: Use Facebook Groups</h2>
      <p>Groups drive strong traffic. Join niche-related groups, provide value in posts, and answer questions. Building trust before sharing links is key. Better strategy: Create your own group and grow it.</p>

      <h2>Step 5: Create Valuable Content</h2>
      <p>Content builds authority. Use post types like tips and guides, short videos, image posts, and case studies (e.g., “How I made my first $50 online”).</p>

      <h2>Step 6: Add Affiliate Links Smartly</h2>
      <p>Avoid direct spam. Use the best methods: Share a blog or landing page link, use storytelling posts, or add links in comments if requested.</p>

      <h2>Step 7: Use Facebook Pages for Branding</h2>
      <p>Post daily content, share reels and videos, build followers, and drive traffic to your offers.</p>

      <h2>Step 8: Try Facebook Ads (Optional)</h2>
      <p>If you have a budget, run ads to a landing page, target a specific audience, and test with a small budget first.</p>

      <h2>Step 9: Stay Consistent</h2>
      <p>Consistency builds reach. Post 1 to 2 times daily, engage with comments, and reply to messages.</p>

      <h2>Step 10: Track Performance</h2>
      <p>Check post engagement, link clicks, and conversions. Focus on what works.</p>

      <div class="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl my-8">
        <h3 class="font-bold text-blue-900 dark:text-blue-100 mb-2">Pro Tips</h3>
        <ul class="text-sm space-y-2">
          <li>Do not spam links</li>
          <li>Focus on helping first</li>
          <li>Use real examples</li>
          <li>Build trust before selling</li>
          <li>Stay active daily</li>
        </ul>
      </div>

      <h2>Simple Strategy That Works</h2>
      <p>Join 5 to 10 groups, post helpful content daily, share one offer through value posts, and engage with your audience. Many beginners get first results in 2 to 4 weeks.</p>

      <h2>Conclusion</h2>
      <p>Facebook works best with trust and engagement. Help people, build authority, and promote offers in a natural way.</p>
      
      <div class="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h3 class="flex items-center gap-2 mb-4 text-brand-primary">
          <span class="p-1 px-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-xs font-bold uppercase tracking-widest">Video Guide</span>
          Watch the Full Tutorial
        </h3>
        <div class="aspect-video w-full bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 relative group cursor-pointer">
          <a href="https://www.youtube.com/watch?v=8Z1z8Zp1X5Y" target="_blank" rel="noopener noreferrer" class="absolute inset-0 z-10"></a>
          <img src="https://picsum.photos/seed/fb-video/800/450" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <PlayCircle className="w-8 h-8 ml-1" />
            </div>
          </div>
        </div>
        <p class="text-xs text-brand-muted mt-3 text-center">Reference: Facebook Affiliate Marketing Complete Masterclass</p>
      </div>
    `
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/intro/600/400",
    category: "Education",
    title: "Affiliate Marketing Explained",
    preview: "New to the world of affiliate marketing? Learn exactly how it works and how to start earning your first commissions.",
    readTime: "4 min read",
    content: `
      <h2>What is Affiliate Marketing</h2>
      <p>Affiliate marketing is a method where you promote products and earn a commission for each sale or action. You do not create the product. You promote it using a special tracking link.</p>
      <img src="https://picsum.photos/seed/marketing-explain/800/600" alt="Affiliate Marketing Concept" referrerPolicy="no-referrer" />

      <h2>How It Works</h2>
      <ul>
        <li>You join an affiliate program</li>
        <li>You get a unique link</li>
        <li>You share the link through content</li>
        <li>Someone clicks and buys</li>
        <li>You earn a commission</li>
      </ul>

      <h2>Where You Can Promote</h2>
      <p>Popular platforms include Pinterest, Instagram, Facebook, Blogs and websites, and YouTube.</p>
      <img src="https://picsum.photos/seed/platforms/800/600" alt="Marketing Platforms" referrerPolicy="no-referrer" />

      <h2>Best Affiliate Platforms</h2>
      <ul>
        <li>Amazon Associates</li>
        <li>ClickBank</li>
        <li>Digistore24</li>
        <li>CJ Affiliate</li>
      </ul>
      <p>Each platform offers different products and commission rates.</p>

      <h2>Types of Affiliate Marketing</h2>
      <h3 class="mt-4">Beginner Level</h3>
      <p>Share links on social media; no website required.</p>
      
      <h3 class="mt-4">Intermediate Level</h3>
      <p>Use a blog or landing page to build an audience.</p>

      <h3 class="mt-4">Advanced Level</h3>
      <p>Use funnels and email marketing, run paid ads, and scale income.</p>

      <div class="bg-brand-bg dark:bg-slate-800 p-6 rounded-xl my-8 border border-slate-200 dark:border-slate-700">
        <h3 class="font-bold text-brand-primary dark:text-blue-400 mb-2">Why People Choose Affiliate Marketing</h3>
        <ul class="text-sm space-y-1">
          <li>Low startup cost</li>
          <li>No product creation</li>
          <li>Work from anywhere</li>
          <li>Passive income potential</li>
        </ul>
      </div>

      <h2>What You Need to Start</h2>
      <p>To begin, you need a niche, a platform, affiliate products, and a content strategy.</p>

      <h2>Common Mistakes</h2>
      <p>Avoid promoting too many products, spamming links, ignoring audience trust, or not staying consistent.</p>

      <h2>Simple Example</h2>
      <p>You promote a product from Amazon Associates with a $50 price and 10% commission. You earn $5 per sale. If you make 20 sales, your total earning is $100.</p>

      <h2>Quick Start Plan</h2>
      <p>Pick one niche, join one affiliate program, create 10 pieces of content, add your affiliate link, and stay consistent for 30 days.</p>

      <h2>Final Insight</h2>
      <p>Affiliate marketing rewards consistency and trust. Focus on helping people solve problems. Income follows when your content delivers value.</p>
    `
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/beginner/600/400",
    category: "Guides",
    title: "Beginner Guide to Affiliate Marketing",
    preview: "Starting from zero? This blueprint shows you exactly how to pick a niche, find products, and make your first sale.",
    readTime: "6 min read",
    content: `
      <h2>What You Are Doing</h2>
      <p>You promote other people’s products and earn commission on each sale. No product. No inventory. No shipping.</p>
      <img src="https://picsum.photos/seed/beginner-start/800/600" alt="Affiliate Marketing Basics" referrerPolicy="no-referrer" />

      <h2>Step 1: Pick One Niche</h2>
      <p>Do not start broad. Choose one: Fitness, Beauty, Tech, or Make money online.</p>
      <div class="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg my-4 border border-emerald-100 dark:border-emerald-800/50">
        <strong>Good niche rule:</strong>
        <ul class="text-sm mt-2">
          <li>People spend money in it</li>
          <li>You can create content easily</li>
        </ul>
      </div>

      <h2>Step 2: Choose One Platform</h2>
      <p>Start with one platform only. Best options: Pinterest, Instagram, or Facebook. Focus beats spreading.</p>
      <img src="https://picsum.photos/seed/choose-platform/800/600" alt="Choose Your Platform" referrerPolicy="no-referrer" />

      <h2>Step 3: Join an Affiliate Program</h2>
      <p>Start with simple platforms like Amazon Associates, ClickBank, or Digistore24. Pick 1 to 2 products only.</p>

      <h2>Step 4: Understand Your Audience</h2>
      <p>You need one thing: A problem to solve. Examples: Weight loss, Acne, Earning money online. Your content must solve this problem.</p>

      <h2>Step 5: Create Simple Content</h2>
      <p>Do not overthink. Start with tips, short guides, before and after ideas, or simple tutorials. Example: “How to lose 5kg at home”</p>
      <img src="https://picsum.photos/seed/content-creation/800/600" alt="Simple Content Ideas" referrerPolicy="no-referrer" />

      <h2>Step 6: Add Your Link Properly</h2>
      <p>Do not spam links. Best method: Send users to a landing page or use bio link tool like Linktree. Build trust first.</p>

      <h2>Step 7: Post Daily</h2>
      <p>Consistency drives results. Post 1 to 3 times per day, focus on value, and repeat what works.</p>

      <h2>Step 8: Improve What Works</h2>
      <p>Check your views, clicks, and saves. Do more of what gets attention.</p>

      <h2>Simple Starter Plan (30 Days)</h2>
      <h3 class="mt-4">Week 1</h3>
      <p>Pick niche, join affiliate program, and set up your account.</p>
      
      <h3 class="mt-4">Week 2</h3>
      <p>Create 10 to 15 pieces of content.</p>

      <h3 class="mt-4">Week 3</h3>
      <p>Post daily and test different content types.</p>

      <h3 class="mt-4">Week 4</h3>
      <p>Focus on best performing content and push one product.</p>

      <h2>Example Earnings</h2>
      <ul>
        <li>Product price: $40</li>
        <li>Commission: 20%</li>
        <li>You earn: $8 per sale</li>
      </ul>
      <p>10 sales = $80 | 50 sales = $400</p>
      <img src="https://picsum.photos/seed/earnings/800/600" alt="Affiliate Earnings Potential" referrerPolicy="no-referrer" />

      <div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg my-6 border border-red-100 dark:border-red-800/50">
        <h3 class="text-red-900 dark:text-red-400 font-bold mb-2">Beginner Mistakes to Avoid</h3>
        <ul class="text-sm space-y-1">
          <li>Promoting too many products</li>
          <li>Posting randomly</li>
          <li>Giving no value</li>
          <li>Quitting early</li>
        </ul>
      </div>

      <h2>What Actually Works</h2>
      <p>One niche + One platform + One product + Daily content.</p>

      <h2>Final Action Plan</h2>
      <ul>
        <li>Pick niche today</li>
        <li>Join one affiliate program</li>
        <li>Create your first 5 posts</li>
        <li>Start posting immediately</li>
      </ul>
      <p>You learn faster by doing.</p>
    `
  }
];

const TOOLS = [
  { name: "Amazon Associates", logo: "📦", desc: "World's largest affiliate program" },
  { name: "ClickBank", logo: "📈", desc: "Top marketplace for digital products" },
  { name: "ShareASale", logo: "🤝", desc: "Reliable network with thousands of brands" },
  { name: "CJ Affiliate", logo: "🎖️", desc: "Leading global affiliate network" }
];

const TESTIMONIALS = [
  { text: "I made my first $100 using Pinterest from this blog in just two weeks!", author: "Sarah J." },
  { text: "Clear and practical guides. No confusion, just actionable steps that work.", author: "Mike T." },
  { text: "Finally, a site that doesn't just sell 'get rich quick' dreams but real methods.", author: "Alex R." },
  { text: "The Instagram Reels strategy is a game changer. My reach exploded in 7 days!", author: "David L." },
  { text: "I was lost with Facebook groups until I followed the value-first guide here.", author: "Emma W." },
  { text: "Best free resource for affiliate marketing. Period.", author: "James K." }
];

// --- Components ---

const MobileMenu = ({ isOpen, onClose, isDarkMode, toggleDarkMode }: { isOpen: boolean; onClose: () => void; isDarkMode: boolean; toggleDarkMode: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[280px] bg-white dark:bg-slate-950 z-[70] shadow-2xl p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-extrabold text-brand-primary dark:text-blue-400">Menu</span>
              <button onClick={onClose} className="p-2 text-brand-muted"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="flex flex-col space-y-4">
              {["Home", "Start Here", "Categories", "Tools", "Blog"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={onClose}
                  className="text-lg font-bold text-brand-text dark:text-slate-300 hover:text-brand-primary transition-colors py-2 border-b border-slate-100 dark:border-slate-800"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="mt-8 space-y-4 pt-8 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={toggleDarkMode}
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-brand-text dark:text-slate-300 font-bold"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-orange-500" /> : <Moon className="w-5 h-5 text-blue-500" />}
                <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>
              <button className="w-full py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-bold dark:text-white">Login</button>
              <button className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg">Sign Up Free</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Hello! I'm your AffiliatePro AI assistant. I can help you find marketing guides or answer questions about affiliate programs. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const PRESET_QUESTIONS = [
    "How to pick a niche?",
    "Best platform for beginners?",
    "Which tools do I need?",
    "How to join Amazon Associates?"
  ];

  const handleSend = async (forcedInput?: string) => {
    const textToSend = forcedInput || input;
    if (!textToSend.trim() || isTyping) return;

    const userMessage = textToSend.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: `You are a professional affiliate marketing mentor for the "AffiliatePro" platform. 
          The platform has guides for Pinterest, Instagram, and Facebook marketing.
          Users can find tools like Amazon Associates, ClickBank, ShareASale, and CJ Affiliate here.
          Your tone is helpful, encouraging, and expert. Keep responses concise and focused on helping users start or grow their affiliate marketing business.
          If users ask where to start, recommend the 'Start Here' section on the website.
          Reference the video tutorials mentioned in the blog posts if relevant.
          Pinterest: https://www.youtube.com/watch?v=7z93uRbMzGI
          Instagram: https://www.youtube.com/watch?v=0UXuYZkgm2M
          Facebook: https://www.youtube.com/watch?v=8Z1z8Zp1X5Y`
        }
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm sorry, I couldn't generate a response." }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Oops, something went wrong with my logic circuits. Please try again later!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[550px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
          >
            {/* Header omitted for brevity in diff but will be kept */}
            <div className="p-4 bg-brand-primary text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">AffiliatePro AI</h3>
                  <div className="flex items-center gap-1.5 ">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Always Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-brand-primary text-white rounded-br-none' 
                      : 'bg-white dark:bg-slate-800 text-brand-text dark:text-slate-200 shadow-sm rounded-bl-none border border-slate-100 dark:border-slate-700'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-100 dark:border-slate-700 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Templates */}
            <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <span className="text-[9px] uppercase font-bold text-brand-muted mb-2 block tracking-wider">Frequently Asked</span>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {PRESET_QUESTIONS.map((q) => (
                  <button 
                    key={q}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[11px] font-bold text-brand-text dark:text-slate-300 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-brand-primary transition-all dark:text-white"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-primary text-white rounded-full shadow-2xl flex items-center justify-center relative group"
      >
        <div className="absolute inset-0 bg-brand-primary rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
        {isOpen ? <X className="w-8 h-8 relative z-10" /> : <MessageCircle className="w-8 h-8 relative z-10" />}
      </motion.button>
    </div>
  );
};

const Navbar = ({ isDarkMode, toggleDarkMode, onMenuClick }: { isDarkMode: boolean; toggleDarkMode: () => void; onMenuClick: () => void }) => {
  return (
    <nav className="sticky top-0 z-50 bg-brand-card dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 flex items-center shadow-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-md flex items-center justify-center">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-brand-primary dark:text-blue-400">
              AffiliatePro
            </span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {["Home", "Start Here", "Categories", "Tools", "Blog"].map((item, idx) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`text-xs font-bold uppercase tracking-wider transition-colors ${idx === 0 ? 'text-brand-primary' : 'text-brand-text dark:text-slate-300 opacity-80 hover:opacity-100'}`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-brand-muted hover:text-brand-primary transition-all group">
              <Search className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="uppercase tracking-wider">Search</span>
            </button>
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-brand-muted hover:text-brand-primary dark:text-slate-400 dark:hover:text-blue-400 transition-all rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-1">
              <button className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-brand-text dark:text-slate-300 px-4 py-2 hover:text-brand-primary transition-colors">
                Login
              </button>
              <button className="hidden sm:block px-5 py-2 bg-brand-primary hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all shadow-brand active:scale-95">
                Sign Up Free
              </button>
            </div>
            <button onClick={onMenuClick} className="lg:hidden p-2 text-brand-text dark:text-slate-300">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-brand p-12 text-white flex flex-col md:flex-row items-center justify-between gap-12 shadow-xl"
        >
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] mb-4">
              Learn Affiliate Marketing<br />That Actually Works
            </h1>
            <p className="text-lg opacity-90 mb-8 max-w-md mx-auto md:mx-0">
              Step-by-step guides for Pinterest, Facebook, Instagram, and more to grow your side hustle.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button 
                onClick={() => document.getElementById('start-here')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-6 py-3 bg-brand-accent hover:bg-orange-600 text-white rounded-lg font-bold transition-all shadow-lg active:scale-95"
              >
                Start Learning
              </button>
              <button 
                onClick={onExplore}
                className="w-full sm:w-auto px-6 py-3 bg-white/10 border border-white/40 text-white rounded-lg font-bold hover:bg-white/20 transition-all font-mono text-sm tracking-tighter"
              >
                Explore Blogs
              </button>
            </div>
          </div>
          
          <div className="hidden md:block w-72 h-44 bg-white/10 rounded-brand border-2 border-white/20 relative overflow-hidden backdrop-blur-sm">
            <div className="p-6">
              <div className="w-full h-2 bg-white/20 rounded-full mb-2" />
              <div className="w-3/4 h-2 bg-white/20 rounded-full mb-6" />
              <div className="flex items-end gap-2">
                <div className="w-5 h-10 bg-white/60 rounded-sm" />
                <div className="w-5 h-14 bg-white/80 rounded-sm" />
                <div className="w-5 h-8 bg-white/40 rounded-sm" />
                <div className="w-5 h-20 bg-brand-accent rounded-sm" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


const FeaturedCategories = ({ onCategoryClick }: { onCategoryClick: (title: string) => void }) => {
  return (
    <section id="categories" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-extrabold text-brand-text dark:text-white uppercase tracking-tight">Featured Categories</h2>
          <span className="text-xs font-bold text-brand-primary cursor-pointer hover:underline">View All</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.title}
              onClick={() => onCategoryClick(cat.title)}
              className="bg-brand-card dark:bg-slate-800 rounded-brand p-4 shadow-brand border border-slate-100 dark:border-slate-700 flex items-center gap-4 group cursor-pointer hover:border-brand-primary transition-all"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${cat.color}`}>
                {cat.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-text dark:text-white mb-0.5">{cat.title.split(' ')[0]}</h4>
                <p className="text-[11px] text-brand-muted">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedBlogPosts = ({ onReadMore }: { onReadMore: (id: number) => void }) => {
  return (
    <section id="blog" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-extrabold text-brand-text dark:text-white mb-8 mb-4 uppercase tracking-tight">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="flex flex-col h-full bg-brand-card dark:bg-slate-800 rounded-brand overflow-hidden border border-slate-100 dark:border-slate-700 shadow-brand hover:scale-[1.02] transition-transform">
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-extrabold text-brand-accent uppercase tracking-wider mb-2">
                  {post.category}
                </span>
                <h3 className="text-sm font-bold text-brand-text dark:text-white mb-2 leading-tight">
                  {post.title}
                </h3>
                <p className="text-[11px] text-brand-muted mb-4 line-clamp-2">
                  {post.preview}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                   <div className="text-[10px] font-bold text-brand-muted">{post.readTime} • Tutorials</div>
                   <button onClick={() => onReadMore(post.id)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                     <ArrowRight className="w-3 h-3 text-brand-primary" />
                   </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const StartHereSteps = ({ onReadBeginnerGuide }: { onReadBeginnerGuide: () => void }) => {
  return (
    <section id="start-here" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-card dark:bg-slate-800 rounded-brand p-8 shadow-brand border border-slate-100 dark:border-slate-700">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-extrabold text-brand-text dark:text-white uppercase tracking-tight">New to Affiliate?</h2>
           </div>
           <div className="flex flex-col gap-4 mb-6">
              {[
                "Pick a profitable niche",
                "Join affiliate programs",
                "Drive traffic and earn"
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-brand-bg dark:bg-slate-900 border border-slate-50 dark:border-slate-800">
                  <div className="w-6 h-6 rounded-full bg-brand-accent text-white text-[12px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <div className="text-sm font-bold text-brand-text dark:text-white">{step}</div>
                </div>
              ))}
           </div>
           <button 
             onClick={onReadBeginnerGuide}
             className="w-full py-3 border border-slate-300 dark:border-slate-700 text-brand-text dark:text-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-sm active:scale-95"
           >
             Read Beginner Guide
           </button>
        </div>
      </div>
    </section>
  );
};

const TopTools = () => {
  const TOOL_LOGOS: Record<string, ReactNode> = {
    "Amazon Associates": <TrendingUp className="w-3 h-3 text-orange-600" />,
    "ClickBank": <Zap className="w-3 h-3 text-blue-600" />,
    "ShareASale": <Share2 className="w-3 h-3 text-red-600" />,
    "CJ Affiliate": <Star className="w-3 h-3 text-indigo-600" />,
    "Impact Radius": <Clock className="w-3 h-3 text-emerald-600" />,
    "PartnerStack": <Layout className="w-3 h-3 text-purple-600" />,
    "Awin": <TrendingUp className="w-3 h-3 text-pink-600" />
  };

  return (
    <section id="tools" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-card dark:bg-slate-800 rounded-brand p-6 shadow-brand border border-slate-100 dark:border-slate-700">
          <h2 className="text-sm font-extrabold text-brand-text dark:text-white mb-4 uppercase tracking-tight">Top Affiliate Tools</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {["Amazon Associates", "ClickBank", "ShareASale", "CJ Affiliate", "Impact Radius", "PartnerStack", "Awin"].map((tool) => (
              <div key={tool} className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-full text-[11px] font-bold text-brand-text dark:text-slate-300 whitespace-nowrap flex items-center gap-2 border border-slate-200 dark:border-slate-800">
                <div className="w-5 h-5 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm">
                  {TOOL_LOGOS[tool]}
                </div>
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const WhyThisSite = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { 
              icon: <ShieldCheck className="w-10 h-10 text-blue-600" />, 
              title: "Proven strategies", 
              desc: "Real methods used by successful marketers. No theory, just what's making money today." 
            },
            { 
              icon: <Star className="w-10 h-10 text-orange-500" />, 
              title: "Beginner friendly", 
              desc: "Simple, clear, actionable guides designed for those starting from absolute zero." 
            },
            { 
              icon: <Layout className="w-10 h-10 text-purple-600" />, 
              title: "Platform focused", 
              desc: "Learn each platform separately with deep-dive tutorials optimized for their algorithms." 
            }
          ].map((item, idx) => (
            <div key={idx} className="text-center md:text-left">
              <div className="mb-6 flex justify-center md:justify-start">{item.icon}</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 dark:bg-slate-800 rounded-[3rem] p-12 md:p-24 relative group">
          {/* Navigation Arrows */}
          <button 
            onClick={prev}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 z-10"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <button 
            onClick={next}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex justify-center mb-12">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-6 h-6 text-orange-400 fill-orange-400" />
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-2xl md:text-4xl font-medium text-white mb-12 italic leading-tight px-4">
                  "{TESTIMONIALS[index].text}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center text-brand-primary font-bold">
                    {TESTIMONIALS[index].author[0]}
                  </div>
                  <p className="text-blue-400 font-bold text-xl tracking-wide">— {TESTIMONIALS[index].author}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center mt-16 gap-3">
            {TESTIMONIALS.map((_, i) => (
              <button 
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 transition-all rounded-full ${index === i ? 'w-12 bg-white' : 'w-2 bg-slate-600 hover:bg-slate-500'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const EmailSignup = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-brand-text dark:bg-slate-800 rounded-brand p-12 text-center text-white relative shadow-brand overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-extrabold mb-4 uppercase tracking-tight">Free Affiliate Tips</h2>
          <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto">Join your fellow marketers getting weekly actionable strategies delivered to their inbox.</p>
          
          <div className="flex flex-col gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm"
            />
            <button className="w-full py-3 bg-brand-accent text-white font-bold rounded-lg text-sm hover:bg-orange-600 transition-all shadow-lg active:scale-95">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 pt-12 pb-8 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 text-[11px] text-brand-muted font-bold uppercase tracking-wider">
           <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand-primary rounded-md flex items-center justify-center">
                <TrendingUp className="text-white w-3 h-3" />
              </div>
              <span className="text-brand-text dark:text-white">AffiliatePro</span>
           </div>
           <div className="flex gap-12">
              <a href="#" className="hover:text-brand-primary">Home</a>
              <a href="#" className="hover:text-brand-primary">Start Here</a>
              <a href="#" className="hover:text-brand-primary">Categories</a>
              <a href="#" className="hover:text-brand-primary">Tools</a>
              <a href="#" className="hover:text-brand-primary">Blog</a>
           </div>
           <div className="flex gap-4">
              <button className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg">Search</button>
              <button className="px-4 py-2 bg-brand-primary text-white rounded-lg">Get Started</button>
           </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-muted text-[11px]">
            © {new Date().getFullYear()} AffiliatePro. All rights reserved.
          </p>
          <div className="flex gap-8 text-[11px] text-brand-muted font-bold uppercase tracking-wider">
            <a href="#" className="hover:text-brand-primary">Privacy Policy</a>
            <a href="#" className="hover:text-brand-primary">Terms of Service</a>
            <a href="#" className="hover:text-brand-primary">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


const ArticleModal = ({ post, onClose }: { post: typeof BLOG_POSTS[0]; onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 md:h-80 shrink-0">
          <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex flex-col justify-end p-8">
            <span className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">{post.category}</span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">{post.title}</h1>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 md:p-12 max-w-none">
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm mb-8">
            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</div>
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5"><ImageIcon className="w-4 h-4" /> Editorial</div>
          </div>
          <div 
            className="article-content text-slate-600 dark:text-slate-400 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedPost = BLOG_POSTS.find(p => p.id === selectedPostId);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleCategoryClick = (title: string) => {
    if (title === "Pinterest Marketing") setSelectedPostId(1);
    else if (title === "Instagram Marketing") setSelectedPostId(2);
    else if (title === "Facebook Marketing") setSelectedPostId(3);
    else if (title === "Beginner Guides") setSelectedPostId(5);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950' : 'bg-white'}`}>
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main className="text-slate-900 dark:text-slate-100">
        <Hero onExplore={() => setSelectedPostId(4)} />
        <FeaturedCategories onCategoryClick={handleCategoryClick} />
        <FeaturedBlogPosts onReadMore={(id) => setSelectedPostId(id)} />
        <StartHereSteps onReadBeginnerGuide={() => setSelectedPostId(5)} />
        <TopTools />
        <WhyThisSite />
        <Testimonials />
        <EmailSignup />
      </main>

      <ChatAgent />

      <Footer />

      <AnimatePresence>
        {selectedPost && (
          <ArticleModal post={selectedPost} onClose={() => setSelectedPostId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

