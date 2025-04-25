import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "../models/postModel";
import Comment from "../models/commentModel";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

const seedPosts = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    await Comment.deleteMany();
    await Post.deleteMany();

    await Post.insertMany([
      {
        title: "Getting Started with TypeScript",
        content:
          "TypeScript is a powerful superset of JavaScript that adds static typing. In this post, we'll explore the basics of TypeScript and how it can improve your development workflow.",
        description: "TypeScript brings static typing to JavaScript, making it easier to catch errors early in development. This comprehensive guide covers TypeScript's key features including interfaces, types, generics, and decorators. You'll learn how to set up a TypeScript project, configure the compiler, and gradually migrate existing JavaScript code. We'll also explore advanced topics like type inference, union types, and how to effectively use TypeScript with popular frameworks.",
        author: "TechGuru",
      },
      {
        title: "Building RESTful APIs with Express",
        content:
          "Express.js is a minimal and flexible Node.js web application framework. Learn how to create robust REST APIs using Express, including routing, middleware, and error handling.",
        description: "This in-depth tutorial walks you through building production-ready RESTful APIs using Express.js. You'll learn about RESTful principles, route organization, authentication implementation, request validation, error handling middleware, and database integration. The guide also covers best practices for API security, rate limiting, documentation with Swagger, and testing strategies. By the end, you'll have the knowledge to create scalable and maintainable Express APIs.",
        author: "CodeMaster",
      },
      {
        title: "MongoDB Best Practices",
        content:
          "Discover essential MongoDB best practices including schema design, indexing strategies, and performance optimization techniques for scalable applications.",
        description: "Master MongoDB with this comprehensive guide to database optimization and best practices. Learn advanced schema design patterns, indexing strategies for improved query performance, and data modeling techniques. We cover replication, sharding, backup strategies, and security configurations. You'll also discover monitoring tools, performance tuning techniques, and how to handle large-scale data operations efficiently. Real-world examples demonstrate practical applications of these concepts.",
        author: "DataPro",
      },
      {
        title: "Modern JavaScript Features",
        content:
          "Explore the latest JavaScript features including async/await, destructuring, spread operators, and more. Stay up-to-date with modern JavaScript development.",
        description: "Dive deep into the modern JavaScript ecosystem and its latest features. This comprehensive guide covers ES6+ features including modules, classes, arrow functions, and template literals. Learn advanced concepts like Promises, async/await patterns, and functional programming techniques. We'll explore modern tooling, build processes, and how to leverage these features in real-world applications. Includes best practices for writing clean, maintainable JavaScript code.",
        author: "JSNinja",
      },
      {
        title: "Docker for Developers",
        content:
          "Learn how to containerize your applications using Docker. This guide covers Docker basics, Dockerfile creation, and container orchestration fundamentals.",
        description: "Master Docker containerization with this comprehensive developer guide. Learn everything from basic concepts to advanced Docker practices including multi-stage builds, networking, volume management, and Docker Compose. Discover how to optimize Docker images, implement CI/CD pipelines, and manage container security. The guide includes practical examples for containerizing different types of applications and debugging techniques for container-related issues.",
        author: "DevOpsGuru",
      },
      {
        title: "GraphQL Fundamentals",
        content:
          "Learn the basics of GraphQL, the modern API query language. Understand schemas, resolvers, and how to build efficient APIs with GraphQL.",
        description: "Explore GraphQL from fundamentals to advanced implementation strategies. This comprehensive guide covers schema design, resolver patterns, authentication, and authorization in GraphQL APIs. Learn about real-time subscriptions, error handling, caching strategies, and performance optimization. We'll also discuss tools like Apollo Server, code-first approaches, and how to migrate from REST to GraphQL. Includes best practices for building scalable GraphQL APIs.",
        author: "APIExpert",
      },
      {
        title: "React Best Practices",
        content:
          "Discover the best practices for building scalable React applications. Topics include component architecture, state management, and performance optimization.",
        description: "Master React development with this comprehensive guide to building scalable and maintainable applications. Learn advanced component patterns, state management solutions, and performance optimization techniques. Explore hooks in depth, context API usage, and code splitting strategies. The guide covers testing methodologies, accessibility considerations, and deployment best practices. Real-world examples demonstrate how to structure large React applications effectively.",
        author: "ReactPro",
      },
      {
        title: "Kubernetes for Beginners",
        content:
          "Get started with Kubernetes container orchestration. Learn about pods, deployments, services, and how to manage containerized applications at scale.",
        description: "Begin your Kubernetes journey with this comprehensive introduction to container orchestration. Learn core concepts including pods, deployments, services, and ingress controllers. Master kubectl commands, understand networking concepts, and explore storage solutions. The guide covers cluster management, scaling strategies, monitoring, and troubleshooting. You'll learn how to deploy applications, manage configurations, and implement rolling updates in a Kubernetes environment.",
        author: "K8sMaster",
      },
      {
        title: "Testing JavaScript Applications",
        content:
          "Comprehensive guide to testing JavaScript applications using Jest, React Testing Library, and other modern testing tools and methodologies.",
        description: "Master JavaScript testing with this comprehensive guide to modern testing practices. Learn unit testing, integration testing, and end-to-end testing strategies using popular tools like Jest, React Testing Library, and Cypress. Explore test-driven development (TDD), behavior-driven development (BDD), and how to write maintainable test suites. The guide covers mocking, code coverage, CI integration, and performance testing techniques.",
        author: "TestGuru",
      },
      {
        title: "CI/CD Pipeline Implementation",
        content:
          "Learn how to implement continuous integration and continuous deployment pipelines using popular tools like Jenkins, GitHub Actions, and GitLab CI.",
        description: "Dive into the world of continuous integration and continuous deployment with this comprehensive guide. Learn how to design and implement efficient CI/CD pipelines using modern tools and practices. Explore automated testing strategies, deployment automation, infrastructure as code, and monitoring solutions. The guide covers pipeline security, artifact management, and how to implement blue-green deployments. Includes real-world examples using popular CI/CD platforms.",
        author: "DevOpsNinja",
      }
    ]);
    console.log("✅ Posts seeded");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding posts:", error);
    process.exit(1);
  }
};

seedPosts();