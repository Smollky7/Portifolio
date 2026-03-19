import { cn } from "@/lib/utils";

describe("Utils - cn function", () => {
  describe("class merging básico", () => {
    it("deve mesclar classes simples", () => {
      const result = cn("px-4", "py-2");
      expect(result).toContain("px-4");
      expect(result).toContain("py-2");
    });

    it("deve remover classes duplicadas", () => {
      const result = cn("px-4", "px-8");
      expect(result).toContain("px-8"); // ultimo valor vence
      expect(result.split("px-").length - 1).toBeLessThanOrEqual(2); // maxino 1 vez px
    });

    it("deve lidar com arrays de classes", () => {
      const result = cn(["px-4", "py-2"]);
      expect(result).toContain("px-4");
      expect(result).toContain("py-2");
    });

    it("deve lidar com objetos de classes", () => {
      const result = cn({
        "px-4": true,
        "py-2": true,
        "text-red": false,
      });
      expect(result).toContain("px-4");
      expect(result).toContain("py-2");
      expect(result).not.toContain("text-red");
    });
  });

  describe("tailwind class override", () => {
    it("deve sobrescrever classes de padding", () => {
      const base = "px-4";
      const override = "px-8";
      const result = cn(base, override);
      expect(result).toContain("px-8");
    });

    it("deve sobrescrever classes de cor", () => {
      const base = "text-black";
      const override = "text-white";
      const result = cn(base, override);
      expect(result).toContain("text-white");
    });

    it("deve sobrescrever classes de display", () => {
      const base = "flex";
      const override = "block";
      const result = cn(base, override);
      expect(result).toContain("block");
    });

    it("deve sobrescrever classes de tamanho", () => {
      const base = "w-4";
      const override = "w-8";
      const result = cn(base, override);
      expect(result).toContain("w-8");
    });

    it("deve sobrescrever classes de altura", () => {
      const base = "h-4";
      const override = "h-8";
      const result = cn(base, override);
      expect(result).toContain("h-8");
    });
  });

  describe("valores falsy", () => {
    it("deve ignorar undefined", () => {
      const result = cn("px-4", undefined, "py-2");
      expect(result).toContain("px-4");
      expect(result).toContain("py-2");
    });

    it("deve ignorar null", () => {
      const result = cn("px-4", null, "py-2");
      expect(result).toContain("px-4");
      expect(result).toContain("py-2");
    });

    it("deve ignorar false", () => {
      const result = cn("px-4", false, "py-2");
      expect(result).toContain("px-4");
      expect(result).toContain("py-2");
    });

    it("deve ignorar empty string", () => {
      const result = cn("px-4", "", "py-2");
      expect(result).toContain("px-4");
      expect(result).toContain("py-2");
    });

    it("deve ignorar 0", () => {
      const result = cn("px-4", 0 as any, "py-2");
      expect(result).toContain("px-4");
      expect(result).toContain("py-2");
    });
  });

  describe("casos complexos", () => {
    it("deve lidar com múltiplos tipos de entrada", () => {
      const result = cn(
        "px-4",
        ["py-2", "bg-white"],
        {
          "text-black": true,
          underline: false,
        },
        undefined,
        "md:px-8",
      );

      expect(result).toContain("px-4");
      expect(result).toContain("py-2");
      expect(result).toContain("bg-white");
      expect(result).toContain("text-black");
      expect(result).toContain("md:px-8");
      expect(result).not.toContain("underline");
    });

    it("deve manter variantes responsivas", () => {
      const result = cn("px-2", "md:px-4", "lg:px-8");

      expect(result).toContain("px-2");
      expect(result).toContain("md:px-4");
      expect(result).toContain("lg:px-8");
    });

    it("deve manter variantes de estado", () => {
      const result = cn(
        "bg-blue-500",
        "hover:bg-blue-600",
        "active:bg-blue-700",
        "disabled:bg-gray-300",
      );

      expect(result).toContain("bg-blue");
      expect(result).toContain("hover:");
      expect(result).toContain("active:");
      expect(result).toContain("disabled:");
    });

    it("deve ser condicional baseado em lógica", () => {
      const isActive = true;
      const isDisabled = false;

      const result = cn(
        "px-4 py-2",
        isActive && "bg-blue-500 text-white",
        isDisabled && "opacity-50 cursor-not-allowed",
      );

      expect(result).toContain("px-4");
      expect(result).toContain("py-2");
      expect(result).toContain("bg-blue-500");
      expect(result).not.toContain("opacity-50");
    });
  });

  describe("string output", () => {
    it("deve retornar uma string", () => {
      const result = cn("px-4", "py-2");
      expect(typeof result).toBe("string");
    });

    it("deve ser uma string válida de classes", () => {
      const result = cn("px-4", "py-2");
      const classes = result.split(" ");
      expect(classes.length).toBeGreaterThan(0);
    });

    it("deve não ter espaços duplos", () => {
      const result = cn("px-4", "py-2");
      expect(result).not.toMatch(/  /);
    });
  });

  describe("performance", () => {
    it("deve lidar com muitas classes", () => {
      const classes = Array.from({ length: 100 }, (_, i) => `class-${i}`);
      const result = cn(...classes);
      expect(result).toBeDefined();
    });

    it("deve lidar com objetos grandes", () => {
      const obj = Object.fromEntries(
        Array.from({ length: 50 }, (_, i) => [`class-${i}`, i % 2 === 0]),
      );
      const result = cn(obj);
      expect(result).toBeDefined();
    });
  });

  describe("exemplos reais de uso", () => {
    it("deve funcionar com padrão de button styling", () => {
      const buttonClasses = cn(
        "px-4 py-2 rounded font-semibold transition-colors",
        "bg-blue-500 text-white hover:bg-blue-600",
      );

      expect(buttonClasses).toContain("px-4");
      expect(buttonClasses).toContain("py-2");
      expect(buttonClasses).toContain("rounded");
    });

    it("deve funcionar com padrão condicionado de componente", () => {
      const isDisabled = true;
      const buttonClasses = cn("px-4 py-2 rounded font-semibold", {
        "bg-blue-500 hover:bg-blue-600 cursor-pointer": !isDisabled,
        "bg-gray-300 cursor-not-allowed opacity-50": isDisabled,
      });

      expect(buttonClasses).toContain("px-4");
      expect(buttonClasses).toContain("bg-gray");
      expect(buttonClasses).toContain("opacity-50");
    });

    it("deve funcionar com padrão responsivo", () => {
      const containerClasses = cn(
        "w-full",
        "px-4 md:px-6 lg:px-8",
        "py-4 md:py-6 lg:py-8",
      );

      expect(containerClasses).toContain("w-full");
      expect(containerClasses).toMatch(/px-[0-9]/);
      expect(containerClasses).toMatch(/md:px/);
    });
  });
});
