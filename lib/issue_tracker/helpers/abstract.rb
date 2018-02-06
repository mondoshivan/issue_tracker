
module Abstract
  def abstract_methods(*args)
    args.each do |name|
      class_eval(<<-END, __FILE__, __LINE__)
        def #{name}(*args)
          raise NotImplementedError.new("You must implement #{name}.")
        end
      END
      # important that this END is capitalized, since it marks the end of <<-END
    end
  end
end