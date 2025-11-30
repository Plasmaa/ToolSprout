import {
    FileText,
    Award,
    FileSignature,
    DollarSign,
    Mail,
    Shield,
    Calendar,
    BookOpen,
    Home as HomeIcon
} from 'lucide-react';

export const tools = [
    {
        title: "Invoice Generator",
        description: "Create professional invoices instantly with customizable templates",
        icon: FileText,
        link: "/invoice",
        color: "bg-green-500"
    },
    {
        title: "Certificate Generator",
        description: "Design beautiful certificates for any occasion or achievement",
        icon: Award,
        link: "/certificate",
        color: "bg-purple-500"
    },
    {
        title: "Contract Maker",
        description: "Generate simple contracts quickly and easily",
        icon: FileSignature,
        link: "/contract",
        color: "bg-orange-500"
    },
    {
        title: "Salary Slip Generator",
        description: "Create detailed salary slips with all necessary components",
        icon: DollarSign,
        link: "/salary-slip",
        color: "bg-blue-500"
    },
    {
        title: "Offer Letter Generator",
        description: "Generate professional offer letters for new employees",
        icon: Mail,
        link: "/offer-letter",
        color: "bg-pink-500"
    },
    {
        title: "Privacy Policy Generator",
        description: "Create comprehensive privacy policies and terms of service",
        icon: Shield,
        link: "/privacy-policy",
        color: "bg-yellow-500"
    },
    {
        title: "Daily Schedule Planner",
        description: "Plan your day efficiently with one-click schedule templates",
        icon: Calendar,
        link: "/schedule",
        color: "bg-emerald-500"
    },
    {
        title: "Homework Planner",
        description: "Organize school assignments and track homework deadlines",
        icon: BookOpen,
        link: "/homework",
        color: "bg-indigo-500"
    },
    {
        title: "Rental Agreement",
        description: "Create legally sound rental agreements for landlords",
        icon: HomeIcon,
        link: "/rental",
        color: "bg-cyan-500"
    }
];
