import { Brain } from "lucide-react";

export function Footer(){
    return (
        <footer className="border-t bg-slate-50">
        <div className="container mx-auto py-10 px-4 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 font-semibold">
              <Brain className="h-6 w-6" />
              <span>ConnectToCare</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Providing specialized support for autism and ADHD.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1">
            {["Resources", "Support", "Legal"].map(section => (
              <div key={section}>
                <h3 className="font-semibold mb-2">{section}</h3>
                
              </div>
            ))}
          </div>
        </div>

        <div className="border-t py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ConnectToCare. All rights reserved.
        </div>
      </footer>
    )
}