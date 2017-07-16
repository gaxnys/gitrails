class ArticlesController < ApplicationController
  def show
    stuff = { status: "hello world!" }
    render stuff
  end

  def create
    @article = Article.new(params[:article])

    @article.save
    stuff = { status: "ok" }
  end

  def update

  end

  def destroy

  end
end
