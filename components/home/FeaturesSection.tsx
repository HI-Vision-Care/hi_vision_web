import { Apple, BarChart3, Calculator, MessageSquare } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-blue-500 font-semibold tracking-wider uppercase mb-2">
          Features We Provide
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
            <Calculator className="w-8 h-8 text-blue-500" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">
              Calculating BMI is easier
            </h3>
            <p className="text-gray-600 text-sm">
              We calculate your BMI index from data like age, height, weight.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
            <Apple className="w-8 h-8 text-green-500" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Food Recommendation</h3>
            <p className="text-gray-600 text-sm">
              We provide food recommendation according to your calorie
              requirements.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto">
            <MessageSquare className="w-8 h-8 text-pink-500" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Interactive Chatbot</h3>
            <p className="text-gray-600 text-sm">
              Solve your queries by interacting with our bot.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Nutritional Value</h3>
            <p className="text-gray-600 text-sm">
              Get all the nutritional values of your preferred dish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
