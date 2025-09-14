<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class InsertUserDataCommand extends Command
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setName('app:insert-user')
             ->setDescription('Inserts example users into the database');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $user = new User();
        $user->setUsername('John Doe');
        $user->setEmail('john@example.com');
        $user->setPassword('password123');

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $output->writeln('User inserted successfully!');

        return Command::SUCCESS;
    }
}
